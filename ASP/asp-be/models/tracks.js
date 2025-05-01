const pool = require('../config/db');


exports.getTracks = function () {
    return pool.query(
        `SELECT tracks.*, users.username
        FROM tracks
        JOIN releases ON tracks.release = releases.id
        JOIN users ON releases.authors = users.id
        `
    );
};

exports.updateTrack = function (track) {
    return pool.query("update tracks set title = $1, release = $2, category = $3, file = $4 where id = $5",
        [track.title, track.release_id, track.category, track.file, track.id]
    );
};

exports.deleteTrack = function (track_id) {
    return pool.query("delete from tracks where id = $1", [track_id]);
};

exports.addTracks = function (track) {
    return pool.query("insert into tracks(id, title, release, category, file) values($1, $2, $3, $4, $5)",
        [track.id, track.title, track.release_id, track.category, track.file]
    );
};

exports.selectTracksFromRelease = function (release_id) {
    return pool.query(`select t.*, u.username from releases r
                        join tracks t on r.id = t.release
                        join users u on r.authors = u.id
                        where r.id = $1
                        `, [release_id]);
};