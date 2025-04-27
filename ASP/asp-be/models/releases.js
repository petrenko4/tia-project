const pool = require('../config/db');


exports.getReleases = function (user_id) {
    return pool.query(
        `select r.id, r.name, r.type, r.authors
        from public.releases r, public.users u
        where r.authors = u.id and u.id = $1
        `, [user_id]
    );
};

exports.addRelease = function(release, userId) {
    return pool.query(`insert into releases(id, name, type, authors) values($1, $2, $3, $4)`, 
        [release.id, release.releaseName, release.type, userId]
    );    
};

exports.getTracksFromRelease = function(release_id, user_id) {
    return pool.query(
        `select * from public.tracks t where t.release = $1
        `, [release_id]
    );    
};
