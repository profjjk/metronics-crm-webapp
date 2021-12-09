const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    customer: {
        businessName: String,
        contactName: String,
        phone: String,
        address: {
            street1: String,
            street2: String,
            city: String,
            state: { type: String, default: 'CA' },
            zipcode: String
        },
    },
    issueNotes: String,
    converted: { type: Boolean, default: false }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;