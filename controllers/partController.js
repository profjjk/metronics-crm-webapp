const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.Part.find({})
            .then(parts => res.json(parts))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Part.findById(req.params.id)
            .then(part => res.json(part))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Part.create(req.body)
            .then(newPart => res.json(newPart))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Part.findById({ _id: req.params.id })
            .then(part => part.remove())
            .then(part => res.json(part))
            .catch(err => res.status(422).json(err));
    }
}