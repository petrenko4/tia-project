const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tracks = [];
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.get('/', (req, res) => {
    res.json(tracks);
});

router.post('/', upload.single('file'), (req, res) => {
    const { title, releaseType, category } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const newTrack = {
        track_id: crypto.randomUUID(),
        title,
        releaseType,
        category,
        file: `/uploads/${file.filename}`,
    };

    tracks.push(newTrack);
    res.status(201).json(newTrack);
});

module.exports = router;
