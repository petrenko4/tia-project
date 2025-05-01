const express = require('express');
const multer = require('multer');
const { addRelease, getReleases, getTracksFromRelease, getReleasesAll } = require('../../models/releases');

const router = express.Router();

router.get('/', (req, res, next) => {

    console.log(req.session);
    console.log(req.sessionID);

    if (req.session && req.session.userId) {
        const release_id = req.query.release_id;
        const tagAll = req.query.tagAll;

        if (release_id) {
            getTracksFromRelease(release_id, req.session.userId).then(
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

            if (tagAll) {
                getReleasesAll().then(
                    (release) => {
                        res.status(200).json(release.rows);
                    }
                ).catch(
                    (err) => {
                        console.log(err);
                        res.status(500);
                    }
                );
            } else {
                getReleases(req.session.userId).then(
                    (release) => {
                        res.status(200).json(release.rows);
                    }
                ).catch(
                    (err) => {
                        console.log(err);
                        res.status(500);
                    }
                );
            }
        }
    } else {
        res.status(401).end();
    }

});

router.post('/', (req, res, next) => {
    const { id, releaseName, type, category } = req.body;
    if (!releaseName || !type) {
        return res.status(400).json({ error: "Missing fields in request" });
    }
    releaseData = {
        id,
        releaseName,
        type,
        category,
    };
    if (req.session && req.session.userId) {
        addRelease(releaseData, req.session.userId).then(
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