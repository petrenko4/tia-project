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

    if (req.session && req.session.userId) {

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
    } else {
        res.status(401).end();
    }
});

router.post('/', upload.single('file'), (req, res, next) => {

    if (req.session && req.session.userId) {

        const { id, title, release_id, category } = req.body;
        const file = req.file;
        console.log(file);
        if (!title || !release_id || !category || !file) {
            return res.status(400).json({ error: "Missing fields in request" });
        }

        trackData = {
            id,
            title,
            release_id,
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
    } else {
        res.status(401).end();
    }
});

module.exports = router;
