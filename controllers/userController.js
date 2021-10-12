const db = require('../models');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


module.exports = {
    findAll: async (req, res) => {
        console.log(req.query)
        try {
            const data = await db.User.find(req.query).select('-password').sort({ createdAt: 1 });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    findOne: async (req, res) => {
        try {
            const data = await db.User.findOne(req.query).select('-password');
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    updateById: async (req, res) => {
        try {
            const data = await db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.status(200).json(data);
        } catch(err) { res.status(422).json(err) }
    },
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
            const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1 hour' });
            res.status(201).json({ data, accessToken });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    login: async (req, res) => {
        const payload = { username: req.body.username, authorization: req.authorization };
        try {
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1 hour' });
            res.status(201).json({ accessToken });
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    delete: async (req, res) => {
        try {
            await db.User.deleteOne({ username: req.username });
            res.status(200).json({ msg: `User deleted: ${req.username}`});
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}
