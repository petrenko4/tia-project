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