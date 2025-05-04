const pool = require('../config/db');

exports.getPlaylists = function(user_id) {
    return pool.query(
        'SELECT * FROM playlists where owner_id = $1', [user_id]
    );
}

exports.addPlaylist = function(playlist, user_id) {
    return pool.query(
        `INSERT INTO playlists(id, owner_id, name, owner) VALUES($1, $2, $3, ' ')`, [playlist.id, user_id, playlist.name]
    );
}

exports.addTrackToPlaylist = function(playlist_id, track_id) {

    console.log("playlist: ", playlist_id);
    console.log("track: ", track_id);

    return pool.query(
        `INSERT INTO playlist_tracks(playlist_id, track_id) VALUES($1, $2)`, [playlist_id, track_id]
    );
}

exports.getTracksFromPlaylist = function(playlist_id) {
    return pool.query(
        `SELECT tracks.*, users.username
        FROM tracks
        JOIN playlist_tracks ON tracks.id = playlist_tracks.track_id
        JOIN releases ON tracks.release = releases.id
        JOIN users ON releases.authors = users.id
        where playlist_id = $1
        `, [playlist_id]
    );
}

exports.deletePlaylist = function(playlist_id) {
    return pool.query(
        `DELETE FROM playlists where id = $1`, [playlist_id]
    );
}