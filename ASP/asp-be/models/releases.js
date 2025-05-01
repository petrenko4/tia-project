const pool = require('../config/db');


exports.getReleases = function (user_id) {
    return pool.query(
        `select r.id, r.name, r.type, r.authors, u.username
        from public.releases r, public.users u
        where r.authors = u.id and u.id = $1
        `, [user_id]
    );
};

exports.getReleasesAll = function () {
    return pool.query(
        `select r.id, r.name, r.type, r.authors, u.username
        from public.releases r, public.users u
        where r.authors = u.id
        `, []
    );
}
exports.addRelease = function (release, userId) {
    return pool.query(`insert into releases(id, name, type, authors) values($1, $2, $3, $4)`,
        [release.id, release.releaseName, release.type, userId]
    );
};

exports.getTracksFromRelease = function (release_id, user_id) {
    return pool.query(`select t.*, u.username from releases r
                        join tracks t on r.id = t.release
                        join users u on r.authors = u.id
                        where r.id = $1
                        `, [release_id]);
};
