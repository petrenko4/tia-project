const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getTracks, addTracks } = require('../../models/tracks');

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

router.get('/', (req, res, next) => {
    getTracks().then(
        (tracks) => {
            res.status(200).json(tracks.rows);
        }
    ).catch(
        (err) => {
            console.log(err);
            res.status(500);
        }
    );
});

router.post('/', upload.single('file'), (req, res, next) => {
    const { id, title, releaseType, category } = req.body;
    const file = req.file;
    console.log(file);
    if (!title || !releaseType || !category || !file) {
        return res.status(400).json({ error: "Missing fields in request" });
    }
    console.log("req body info");
    console.log(req.body);
    
    trackData = {
        id,
        title,
        releaseType,
        category,
        file: file.filename
    };

    addTracks(trackData).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log(e);
            res.status(500);
        }
    )
});

module.exports = router;
