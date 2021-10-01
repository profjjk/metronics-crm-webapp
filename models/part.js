const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partNumber: { type: String, required: [true, 'Part # required'], index: true },
    description: { type: String, required: [true, 'Description required'] },
    purchasePrice: Number,
    salePrice: Number,
    stock: Number,
    minimum: { type: Number, default: 0 }
})

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
