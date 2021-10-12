const db = require('../models');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        const { username, password, authorization } = req.body;
        try {
            const userExists = await db.User.findOne({ username });
            if (userExists) return res.status(400).send(`Username "${username}" already exists.`);
            const data = await db.User.create({
                username,
                password: await bcrypt.hash(password, 10),
                authorization
            });
            const accessToken = jwt.sign({ username, authorization }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12 hours' });
            res.status(201).json({ accessToken });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    login: async (req, res) => {
        const payload = { username: req.body.username, authorization: req.authorization };
        try {
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12 hours' });
            res.status(201).json({ accessToken });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
}