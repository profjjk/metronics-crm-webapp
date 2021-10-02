const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Customer.find(req.query).sort({ updatedAt: 1 });
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    findById: async (req, res) => {
        try {
            const data = await db.Customer.findById(req.params.id);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    updateById: async (req, res) => {
        try {
            const data = await db.Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    create: async (req, res) => {
        try {
            const data = await db.Customer.create(req.body);
            res.json(data);
        } catch(err) { res.status(422).json(err) }
    },
    delete: async (req, res) => {
        try {
            await db.Customer.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json(err) }
    }
}

// TODO: Sort findAll results by lastModified
