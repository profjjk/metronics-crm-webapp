const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Message.find().sort({ createdAt: -1 });
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    updateById: async (req, res) => {
        try {
            const data = await db.Message.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    delete: async (req, res) => {
        try {
            await db.Message.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}