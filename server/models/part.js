const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partNumber: { type: String, required: [true, 'Part # required'], index: true },
    description: { type: String, required: [true, 'Description required'] },
    stock: { type: Number, default: 0 },
    minimum: { type: Number, default: 0 }
}, { timestamps: true });

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
