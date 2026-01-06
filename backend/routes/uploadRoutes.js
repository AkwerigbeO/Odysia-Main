const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/gridfsConfig');
const {
    uploadFile,
    getFile,
    deleteFile,
    getFileInfo
} = require('../controllers/uploadController');

// Public upload route (for expert applications, etc.)
router.post('/public', upload.single('file'), uploadFile);

// Upload routes (protected)
router.post('/', protect, upload.single('file'), uploadFile);

// File retrieval routes (public - for displaying images)
router.get('/:id', getFile);
router.get('/:id/info', getFileInfo);

// Delete route (protected)
router.delete('/:id', protect, deleteFile);

module.exports = router;
