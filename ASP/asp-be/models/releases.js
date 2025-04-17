const pool = require('../config/db');


exports.getReleases = function () {
    return pool.query(
        `select * 
        from public.releases 
        `
    );
};

exports.addRelease = function(release) {
    console.log(release);
    return pool.query(`insert into releases(id, name, release_type, authors, tracks) values($1, $2, $3, $4, $5)`, 
        [release.id, release.releaseName, release.type, '11111111', release.tracks]
    );    
};

exports.getTracksFromRelease = function(release_id) {
    return pool.query(`select * from public.tracks where release = $1`, [release_id]);    
};
