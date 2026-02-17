const express = require('express');
const router = express.Router();
const { protect, optionalProtect } = require('../middleware/authMiddleware');
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

// File retrieval: images are public, non-images (PDFs/docs) require auth (enforced in controller)
router.get('/:id', optionalProtect, getFile);
router.get('/:id/info', optionalProtect, getFileInfo);

// Delete route (protected)
router.delete('/:id', protect, deleteFile);

module.exports = router;
