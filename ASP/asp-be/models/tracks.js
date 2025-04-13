const pool = require('../config/db');


exports.getTracks = function () {
    return pool.query(
        `select * 
        from public.tracks 
        `
    );
};

exports.addTracks = function(track) {
    console.log(track);
    return pool.query("insert into tracks(id, title, release, category, file) values($1, $2, $3, $4, $5)", 
        [track.id, track.title, track.releaseType, track.category, '/uploads/' + track.file]
    );    
};