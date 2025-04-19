var express = require('express'); // ESM: import
var { getUsers, addNewUser } = require('../../models/users.js');
var { comparePassword } = require('../../utils/authHelpers.js');
var pool = require('../../config/db');
const { config } = require('../../config/config');

var router = express.Router();

router.post("/signup", (req, res) => {

    console.log("signup called");
    const { id, username, email, password } = req.body;

    try {
        // 1. Check if username exists
        pool.query("SELECT * FROM accounts WHERE login = $1", [username]).then((result) => {

            if (result.rows.length > 0) {
                return res.status(409).json({ error: "Username already taken" }); // 409 Conflict
            }
            addNewUser(req.body)
                .then(() => {
                    return res.status(200).end();
                })
                .catch((e) => {
                    console.log(e);
                    return res.status(500).end();
                })

        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Database error" }).end();
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }



});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    getUsers(username)
        .then((result) => {
            if (result.rows && result.rows.length === 1) {
                const userId = result.rows[0].id;
                const hashedPassword = result.rows[0].password;
                console.log(result.rows[0]);
                console.log("hashed psswd: " + hashedPassword);
                console.log(userId);
                comparePassword(password, hashedPassword)
                    .then((isValid) => {
                        if (isValid) {
                            req.session.userId = userId;  // creates session
                            return res.status(200).end();
                        }
                        // invalid password
                        else {
                            console.log("Invalid password");
                            return res.status(401).end();
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        // internal server error
                        res.status(500).end();
                    })
            }
            // user does not exist
            else {
                console.log("User does not exist");
                return res.status(401).end();
            }
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).end();
        })
});

router.delete("/logout", (req, res) => {
    if (req.session && req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).end();  // internal server error
            } else {
                // clear the cookie in the browser
                res.clearCookie(config.session.cookieName);
                return res.status(200).end();  // successful logout
            }
        });
    } else {
        return res.status(400).end();  // bad request - session doesn't exist
    }
});

module.exports = router;