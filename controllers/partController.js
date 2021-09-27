const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        db.Part.find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.Part.findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
} 