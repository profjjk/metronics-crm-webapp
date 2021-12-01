const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true })

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;