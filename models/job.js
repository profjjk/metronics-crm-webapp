const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customerId: { type: String, required: true, index: true },
    serviceDate: { type: String, index: true },
    invoiceNumber: { type: String, index: true },
    issueNotes: String,
    repairNotes: String,
    status: { type: String, default: 'Waiting' },
    type: { type: String, default: 'Unknown' },
    parts: Array,
    totalBill: { type: Number, default: 0 },
    paid: { type: Boolean, default: false }
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
