const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Request.find().sort({ createdAt: 1 });
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    delete: async (req, res) => {
        try {
            await db.Request.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}