var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/auth');
module.exports = {
    async signup(req, res) {
        try {
            const payload = req.body;

            const password = await bcrypt.hash(payload.password, 10);

            const result = await sql.query(
                "INSERT INTO users (id,username,password,name) VALUES (0,?,?,?)",
                [
                    payload.username,
                    password,
                    payload.name
                ]
            );
            res.status(200).send('Success')
        } catch (error) {
            console.log(error);
        }
    },

    async signin(req, res) {
        try {
            const payload = req.body;
            const result = await sql.query('SELECT * FROM users WHERE username = ?', [payload.username]
            );

            const user = result[0]
            if (!user) {
                return res.status(401).send('USER NOT FOUND');
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send('WRONG PASSWORD');
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.status(200).send({
                name: user.name,
            });
        } catch (error) {
            console.log(error);
        }
    },

};
