const crypto = require('crypto');
const path = require('path');
const { Readable } = require('stream');
const { getGridfsBucket } = require('../config/gridfsConfig');

// Helper to upload buffer to GridFS
const uploadToGridFS = (buffer, filename, mimetype, metadata = {}) => {
    return new Promise((resolve, reject) => {
        const gridfsBucket = getGridfsBucket();

        if (!gridfsBucket) {
            return reject(new Error('GridFS not initialized'));
        }

        // Create readable stream from buffer
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);

        // Generate unique filename
        const uniqueFilename = crypto.randomBytes(16).toString('hex') + path.extname(filename);

        // Create upload stream
        const uploadStream = gridfsBucket.openUploadStream(uniqueFilename, {
            contentType: mimetype,
            metadata: {
                originalname: filename,
                ...metadata
            }
        });

        // Pipe buffer to GridFS
        readableStream.pipe(uploadStream);

        uploadStream.on('error', (error) => {
            reject(error);
        });

        uploadStream.on('finish', () => {
            resolve({
                id: uploadStream.id,
                filename: uniqueFilename,
                originalname: filename,
                contentType: mimetype,
                size: buffer.length
            });
        });
    });
};

module.exports = { uploadToGridFS };
