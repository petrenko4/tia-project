const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('@aws-sdk/client-s3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { getTracks, addTracks, deleteTrack, updateTrack } = require('../../models/tracks');


const router = express.Router();

router.delete('/', (req, res, next) => {
    if (req.session && req.session.userId) {
        const track_id = req.query.track_id
        if (track_id) {
            deleteTrack(track_id).then(
                (tracks) => {
                    res.status(200).json(tracks.rows);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    res.status(500);
                }
            );
        }

    } else {
        res.status(401).end();
    }
});

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

const s3 = new AWS.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
    },
});

// Configure multer-s3 to use AWS S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
        key: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
        },
    }),
});

router.put('/', (req, res) => {
    if (req.session && req.session.userId) {
        const { id, title, release_id, category } = req.body;
        console.log(req.body);
        if (!id || !title || !release_id || !category) {
            return res.status(400).json({ error: "Missing fields" });
        }
        updateTrack(req.body).then(
            (r) => res.status(200).end()
        ).catch(
            (e) => {
                console.log(e);
                res.status(500).end();
            }
        )
    } else {
        res.status(401).end();
    }
});

router.post('/', upload.single('file'), (req, res) => {
    if (req.session && req.session.userId) {

        const { id, title, release_id, category } = req.body;
        const file = req.file;
        if (!id || !title || !release_id || !category || !file) {
            console.log(id, title, release_id, category, file);
            console.log('Missing fields');
            return res.status(400).json({ error: "Missing fields" });
        }

        // multer-s3 gives you back the file URL as `file.location`
        const trackData = {
            id,
            title,
            release_id,
            category,
            file: file.location,
        };

        addTracks(trackData).then(
            (r) => res.status(200).end()
        ).catch(
            (e) => {
                console.log(e);
                res.status(500).end();
            }
        )
    } else {
        res.status(401).end();
    }


});

module.exports = router;
