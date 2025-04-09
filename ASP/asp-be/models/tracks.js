const { Pool } = require('pg');
const { config } = require('../config.secrets')
const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

exports.getTracks = function () {
    return pool.query(
        `select m.*, 
        from tracks m
        left join users u on m.user_id=u.id`
    );
};

exports.addTracks = function(message) {
     return pool.query("insert into tracks(id, title, release, category) values($1, $2, $3, $4)", 
        [track.id, track.title, track.release, message.category]
    );    
};