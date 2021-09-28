const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Job.find(req.query);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    findById: async (req, res) => {
        try {
            const data = await db.Job.findById(req.params.id);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    updateById: async (req, res) => {
        try {
            const data = await db.Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    create: async (req, res) => {
        try {
            const data = await db.Job.create(req.body);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    delete: async (req, res) => {
        try {
            await db.Job.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json(err) }
    }
}