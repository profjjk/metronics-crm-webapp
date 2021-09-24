const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.Job.find({})
            .then(jobs => res.json(jobs))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Job.findById(req.params.id)
            .then(job => res.json(job))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Job.create(req.body)
            .then(newJob => res.json(newJob))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Job.findById({ _id: req.params.id })
            .then(job => job.remove())
            .then(job => res.json(job))
            .catch(err => res.status(422).json(err));
    }
}