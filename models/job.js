const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customerId: String,
    dateCompleted: String,
    invoiceNumber: String,
    issueNotes: String,
    repairNotes: String,
    status: { enum: ['Waiting', 'Scheduled', 'Completed', 'Canceled'] },
    type: { enum: ['Maintenance', 'Repair', 'Callback', 'Training'] },
    parts: []

})

const JobModel = mongoose.model("Job", jobSchema);

module.exports = { JobModel, jobSchema };