const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customerId: { type: String, required: true, index: true },
    dateCompleted: { type: String, index: true },
    invoiceNumber: { type: String, index: true },
    issueNotes: String,
    repairNotes: String,
    status: { enum: ['Waiting', 'Scheduled', 'Completed', 'Canceled'] },
    type: { enum: ['Maintenance', 'Repair', 'Callback', 'Training'] },
    parts: []

})

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;