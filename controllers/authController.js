const db = require('../models');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        const { username, password, authorization } = req.body;
        try {
            const userExists = await db.User.findOne({ username });
            if (userExists) res.status(400).send(`Username "${username}" already exists.`);
            const response = await db.User.create({
                username,
                password: await bcrypt.hash(password, 10),
                authorization
            });
            const user = { username: response.username, authorization: response.authorization }
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12 hours' });
            res.status(201).json({ username: user.username, authorization: user.authorization, token });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    login: async (req, res) => {
        const user = req.user;
        try {
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12 hours' });
            res.status(201).json({ username: user.username, authorization: user.authorization, token });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
}