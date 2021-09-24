const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.Customer.find({})
            .then(customers => res.json(customers))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Customer.findById(req.params.id)
            .then(customer => res.json(customer))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Customer.create(req.body)
            .then(newCustomer => res.json(newCustomer))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Customer.findById({ _id: req.params.id })
            .then(customer => customer.remove())
            .then(customer => res.json(customer))
            .catch(err => res.status(422).json(err));
    }
} 