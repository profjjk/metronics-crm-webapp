const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customer_id: { type: String, required: true },
    date_completed: String,
    invoice_number: String,
    issue_notes: String,
    repair_notes: String,
    status: String,
    type: String,
    parts: []

})

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;