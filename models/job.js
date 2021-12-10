const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    serviceDate: { type: String, index: true },
    invoiceNumber: { type: String, index: true },
    issueNotes: String,
    serviceNotes: String,
    status: { type: String, default: 'Pending' },
    parts: Array,
    totalBill: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
