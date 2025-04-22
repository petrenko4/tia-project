const pool = require('../config/db');


exports.getTracks = function () {
    return pool.query(
        `select * 
        from public.tracks 
        `
    );
};

exports.addTracks = function(track) {
    return pool.query("insert into tracks(id, title, release, category, file) values($1, $2, $3, $4, $5)", 
        [track.id, track.title, track.release_id, track.category, track.file]
    );    
};

exports.selectTracksFromRelease = function(release_id) {
    return pool.query("select * from public.tracks where release = $1", [release_id]);    
};