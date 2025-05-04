const { getPlaylists, addPlaylist, addTrackToPlaylist, getTracksFromPlaylist, deletePlaylist } = require('../../models/playlists');
const express = require('express');
const multer = require('multer');

const router = express.Router();

router.get('/', (req, res, next) => {

    if (req.session && req.session.userId) {
        const playlist_id = req.query.playlist_id;
        if (playlist_id) {
            getTracksFromPlaylist(playlist_id).then(
                (r) => res.status(200).json(r.rows),
                (e) => {
                    console.log(e);
                    res.status(500).end();
                }
            )
        } else {

            getPlaylists(req.session.userId).then(
                (r) => res.status(200).json(r.rows),
                (e) => {
                    console.log(e);
                    res.status(500).end();
                }
            )

        }
    } else {
        res.status(401).end();
    }
});

router.post('/', (req, res, next) => {

    const playlist_id = req.query.playlist_id;
    const track_id = req.query.track_id;

    if (track_id && playlist_id) {
        console.log("(post)playlist: ", playlist_id);
        console.log("(post)track: ", track_id);
        addTrackToPlaylist(playlist_id, track_id).then(
            (r) => res.status(200).end()
        ).catch(
            (e) => {
                console.log(e);
                res.status(500).end();
            }
        )
    } else {
        const { id, name } = req.body;
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
    }


})

router.delete('/', (req, res) => {
    if (req.session && req.session.userId) {
        const playlist_id = req.query.playlist_id;
        if (playlist_id) {
            deletePlaylist(playlist_id).then(
                (r) => res.status(200).end()
            ).catch(
                (e) => {
                    console.log(e);
                    res.status(500).end();
                }
            )
        }
    } else {
        res.status(401).end();
    }
});


module.exports = router;