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
    update: async (req, res) => {
        try {
            const data = await db.User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
            res.status(200).json(data);
        } catch(err) { res.status(422).json(err) }
    },
    delete: async (req, res) => {
        try {
            await db.User.deleteOne({ username: req.params.username });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}
