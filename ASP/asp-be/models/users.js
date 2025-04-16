var pool = require('../config/db.js');

// use parameterized queries to prevent SQL injection !

// returns promise !
exports.getUsers = function(username) {   
    return pool.query(
        "select * from users u where u.username = $1",
        [username]
    );
};
