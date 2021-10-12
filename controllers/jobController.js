const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Job.find().sort({ createdAt: 1 }).populate('customer');
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    findById: async (req, res) => {
        try {
            const data = await db.Job.findById(req.params.id).populate('customer');
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    updateById: async (req, res) => {
        try {
            const data = await db.Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    create: async (req, res) => {
        try {
            const data = await db.Job.create(req.body);
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    delete: async (req, res) => {
        try {
            await db.Job.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    },
    deleteMany: async (req, res) => {
        try {
            await db.Job.deleteMany({ 'customer._id': req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}
