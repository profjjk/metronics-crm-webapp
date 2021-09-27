const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partNumber: { type: String, required: [true, 'Part # required'] },
    description: { type: String, required: [true, 'Description required'] },
    purchasePrice: Number,
    salePrice: Number,
    stock: Number
})

const PartModel = mongoose.model("Part", partSchema);

module.exports = PartModel;