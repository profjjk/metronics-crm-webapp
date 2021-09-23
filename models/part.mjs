import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
    part_number: { type: String, required: [true, 'part # required'] },
    description: { type: String, required: [true, 'description required'] },
    purchase_price: Number,
    sale_price: Number,
    stock: Number
})

const Part = mongoose.model("Part", partSchema);

export default Part;