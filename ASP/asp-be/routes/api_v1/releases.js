const express = require('express');
const multer = require('multer');
const {addRelease, getReleases} = require('../../models/releases');

const router = express.Router();

router.get('/', (req, res, next) => {
    getReleases().then(
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

router.post('/', (req, res, next) => {
    console.log("post invoked");
    const { id, releaseName, type, category, tracks } = req.body;
    console.log(req.body);
    if (!releaseName || !type) {
        return res.status(400).json({ error: "Missing fields in request" });
    }
    releaseData = {
        id,
        releaseName,
        type,
        category,
        tracks
    };
    addRelease(releaseData).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log(e);
            res.status(500);
        }
    )
});

module.exports = router;