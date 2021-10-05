const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Part.find(req.query).sort({ partNumber: 1 });
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    findById: async (req, res) => {
        try {
            const data = await db.Part.findById(req.params.id);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    updateById: async (req, res) => {
        try {
            const data = await db.Part.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    create: async (req, res) => {
        try {
            const data = await db.Part.create(req.body);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    delete: async (req, res) => {
        try {
            await db.Part.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json(err) }
    }
}
