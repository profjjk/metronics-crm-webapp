const db = require('../models');
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res) => {
    const admin = await db.User.find({ username: req.body.username });
    if (admin.length < 1) {
        res.status(404).send("Cannot find user.");
        return false;
    }
    const validPassword = await bcrypt.compare(req.body.password, admin[0].password);
    if (validPassword) {
        return true;
    } else {
        res.status(401).send("Invalid password");
        return false;
    }
}

module.exports = {
    // findAll: async (req, res) => {
    //     try {
    //         const data = await db.User.find(req.query).sort({ createdAt: 1 });
    //         res.status(200).json(data);
    //     } catch(err) { res.status(422).json(err) }
    // },
    findOne: async (req, res) => {
        try {
            const data = await db.User.find({ username: req.body.username });
            res.status(200).json(data);
        } catch(err) { res.status(422).json(err) }
    },
    // updateById: async (req, res) => {
    //     try {
    //         const data = await db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    //         res.status(200).json(data);
    //     } catch(err) { res.status(422).json(err) }
    // },
    create: async (req, res) => {
        try {
            const data = await db.User.create({
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                authorization: req.body.authorization
            });
            res.status(201).json(data);
        } catch(err) { res.status(422).json(err) }
    },
    login: async (req, res) => {
        try {
            const authenticated = await authenticateUser(req, res);
            if (authenticated) {
                const accessToken = jwt.sign({ name: req.body.username }, process.env.ACCESS_TOKEN_SECRET);
                res.json({ accessToken });
            }
        } catch(err) { res.status(422).json(err) }
    },
    // delete: async (req, res) => {
    //     try {
    //         await db.User.deleteOne({ _id: req.params.id });
    //         res.status(204).end();
    //     } catch(err) { res.status(422).json(err) }
    // }
}