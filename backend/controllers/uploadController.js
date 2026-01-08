const mongoose = require('mongoose');
const { getGridfsBucket } = require('../config/gridfsConfig');
const { uploadToGridFS } = require('../utils/gridfsHelper');

// @desc    Upload a file
// @route   POST /api/upload
// @access  Private
exports.uploadFile = async (req, res) => {
    try {
        console.log('Upload request received');

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded'
            });
        }

        console.log('File received:', req.file.originalname, req.file.mimetype, req.file.size);

        // Upload to GridFS
        const fileData = await uploadToGridFS(
            req.file.buffer,
            req.file.originalname,
            req.file.mimetype,
            { uploadedBy: req.user ? req.user._id : null }
        );

        console.log('File uploaded to GridFS:', fileData);

        res.status(201).json({
            success: true,
            data: {
                fileId: fileData.id.toString(),
                filename: fileData.filename,
                originalname: fileData.originalname,
                mimetype: fileData.contentType,
                size: fileData.size,
                url: `/api/files/${fileData.id}`
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'File upload failed: ' + error.message
        });
    }
};

// @desc    Get/Stream a file by ID
// @route   GET /api/files/:id
// @access  Public
exports.getFile = async (req, res) => {
    try {
        const gridfsBucket = getGridfsBucket();

        if (!gridfsBucket) {
            return res.status(500).json({
                success: false,
                error: 'GridFS not initialized'
            });
        }

        const fileId = new mongoose.Types.ObjectId(req.params.id);

        // Find file metadata
        const files = await gridfsBucket.find({ _id: fileId }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'File not found'
            });
        }

        const file = files[0];

        // Set CORS headers for cross-origin access (critical for frontend on different port)
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Access-Control-Allow-Origin', '*');

        // Set appropriate headers
        res.set('Content-Type', file.contentType || 'application/octet-stream');

        const isDownload = req.query.download === 'true';
        const disposition = isDownload ? 'attachment' : 'inline';
        res.set('Content-Disposition', `${disposition}; filename="${file.metadata?.originalname || file.filename}"`);

        // Stream the file
        const downloadStream = gridfsBucket.openDownloadStream(fileId);
        downloadStream.pipe(res);

        downloadStream.on('error', (error) => {
            console.error('Stream error:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    error: 'Error streaming file'
                });
            }
        });

    } catch (error) {
        console.error('Get file error:', error);
        res.status(500).json({
            success: false,
            error: 'Error retrieving file'
        });
    }
};

// @desc    Delete a file by ID
// @route   DELETE /api/files/:id
// @access  Private
exports.deleteFile = async (req, res) => {
    try {
        const gridfsBucket = getGridfsBucket();

        if (!gridfsBucket) {
            return res.status(500).json({
                success: false,
                error: 'GridFS not initialized'
            });
        }

        const fileId = new mongoose.Types.ObjectId(req.params.id);

        // Check if file exists
        const files = await gridfsBucket.find({ _id: fileId }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'File not found'
            });
        }

        // Delete the file
        await gridfsBucket.delete(fileId);

        res.status(200).json({
            success: true,
            message: 'File deleted successfully'
        });

    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({
            success: false,
            error: 'Error deleting file'
        });
    }
};

// @desc    Get file info/metadata
// @route   GET /api/files/:id/info
// @access  Public
exports.getFileInfo = async (req, res) => {
    try {
        const gridfsBucket = getGridfsBucket();

        if (!gridfsBucket) {
            return res.status(500).json({
                success: false,
                error: 'GridFS not initialized'
            });
        }

        const fileId = new mongoose.Types.ObjectId(req.params.id);
        const files = await gridfsBucket.find({ _id: fileId }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'File not found'
            });
        }

        const file = files[0];

        res.status(200).json({
            success: true,
            data: {
                id: file._id,
                filename: file.filename,
                originalname: file.metadata?.originalname,
                mimetype: file.contentType,
                size: file.length,
                uploadDate: file.uploadDate,
                url: `/api/files/${file._id}`
            }
        });

    } catch (error) {
        console.error('Get file info error:', error);
        res.status(500).json({
            success: false,
            error: 'Error retrieving file info'
        });
    }
};
