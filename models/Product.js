import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: String,
  status: { type: Boolean, default: true },
  stock: { type: Number, default: 0, min: 0 },
  code: { type: String, required: true, unique: true },
  thumbnails: [String],
}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);
export default Product;
