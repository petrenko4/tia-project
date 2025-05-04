const { getPlaylists, addPlaylist } = require('../../models/playlists');
const express = require('express');
const multer = require('multer');
const { get } = require('./tracks');

const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.session && req.session.userId) {
        getPlaylists(req.session.userId).then(
            (r) => res.status(200).json(r.rows),
            (e) => {
                console.log(e);
                res.status(500).end();
            }
        )
    } else {
        res.status(401).end();
    }
});

router.post('/', (req, res, next) => {
    const {id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ error: "Missing fields in request" });
    }
    playlistData = {
        id,
        name,
    };
    if (req.session && req.session.userId) {
        addPlaylist(playlistData, req.session.userId).then(
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
})

module.exports = router;