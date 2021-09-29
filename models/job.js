const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customerId: { type: String, required: true, index: true },
    dateCompleted: { type: String, index: true },
    invoiceNumber: { type: String, index: true },
    issueNotes: String,
    repairNotes: String,
    status: String,
    type: String,
    parts: Array

})

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;