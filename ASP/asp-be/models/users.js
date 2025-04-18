var pool = require('../config/db.js');
const bcrypt = require('bcrypt');
var { hashPassword } = require('../utils/authHelpers.js');
// use parameterized queries to prevent SQL injection !

// returns promise !
exports.getUsers = function (username) {
    return pool.query(
        "select u.username, u.id, a.password from users u, accounts a where u.username = $1 and u.id = a.id",
        [username]
    );
};

exports.addNewUser = function (user) {
    console.log("addNewUser called");
    console.log(user)
    return hashPassword(user.password)
        .then((hashedPassword) => {
            return pool.query(
                `INSERT INTO users(id, email, date_of_birth, gender, username) 
                 VALUES($1, $2, NULL, NULL, $3)`,
                [user.id, user.email, user.username]
            ).then(() => {
                return pool.query(
                    `INSERT INTO accounts(id, login, password, is_admin) 
                     VALUES($1, $2, $3, NULL)`,
                    [user.id, user.username, hashedPassword]
                );
            });
        });
};
