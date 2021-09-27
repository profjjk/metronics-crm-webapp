const db = require('../models');
const { JobModel } = require('../models/job')

module.exports = {
    findAllCustomers: (req, res) => {
        db.Customer.find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    findByCustomerId: (req, res) => {
        db.Customer.findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    findByJobId: (req, res) => {
        db.Customer.findOne({ 'jobs._id': req.params.id })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    addJob: (req, res) => {
        const job = new JobModel(req.body);
        db.Customer.findOneAndUpdate({ '_id': req.params.id }, {
            $push: { 'jobs': job }}, { new: true })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    updateJob: (req, res) => {
        db.Customer.findOneAndUpdate({ 'jobs._id': req.params.id }, {
            $set: { 'jobs._id': req.body }}, { new: true })
    },
    removeJob: (req, res) => {
        db.Customer.findOneAndUpdate({ 'jobs._id': req.params.id }, {
            $pull: { 'jobs._id': req.params.id }}, { new: true })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
} 