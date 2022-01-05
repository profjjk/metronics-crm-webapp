const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        try {
            const userExists = await db.User.findOne({ username });
            if (userExists) res.status(400).send(`Username "${username}" already exists.`);
            const user = await db.User.create({
                username,
                password: await bcrypt.hash(password, 10)
            });
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5 hours' });
            res.status(201).json({ _id: user._id, token });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    login: async (req, res) => {
        const user = { _id: req.user };
        try {
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5 hours' });
            res.status(201).json({ _id: user._id, token: token });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
}