const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.User.find().select('-password').sort({ createdAt: 1 });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    findOne: async (req, res) => {
        try {
            const data = await db.User.findOne({ username: req.params.username }).select('-password');
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    findById: async (req, res) => {
        try {
            const data = await db.User.findById({ _id: req.params.id }).select('-password');
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    create: async (req, res) => {
        try {
            const data = await db.User.create(req.body);
            res.status(201).res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    update: async (req, res) => {
        try {
            const data = await db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.status(200).json(data);
        } catch(err) { res.status(422).json(err) }
    },
    delete: async (req, res) => {
        try {
            await db.User.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}
