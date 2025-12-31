const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let gridfsBucket;

// Initialize GridFS after MongoDB connection
const initGridFS = () => {
    const conn = mongoose.connection;

    const doInit = () => {
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'uploads'
        });
        console.log('GridFS initialized successfully');
    };

    if (conn.readyState === 1) {
        doInit();
    } else {
        conn.once('open', doInit);
    }
};

// Use memory storage instead of gridfs-storage due to compatibility issues
const storage = multer.memoryStorage();

// File filter for allowed types
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'application/zip'
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${file.mimetype} is not allowed`), false);
    }
};

// Create multer upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 16 * 1024 * 1024 // 16MB max
    }
});

// Get the GridFS bucket
const getGridfsBucket = () => gridfsBucket;

module.exports = {
    initGridFS,
    upload,
    getGridfsBucket
};
