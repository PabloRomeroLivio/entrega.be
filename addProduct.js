
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const testProduct = {
  title: 'Camiseta Node.js',
  description: 'Camiseta de algodón con logo de Node.js',
  price: 25.99,
  category: 'ropa',
  code: 'node001',
  stock: 50,
  status: true,
  thumbnails: []
};

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');
    await Product.create(testProduct);
    console.log('✅ Producto agregado');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al agregar producto:', err);
  });
