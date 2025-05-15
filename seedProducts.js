import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    title: 'Camiseta Node.js',
    description: 'Camiseta de algodón con logo de Node.js',
    price: 25.99,
    category: 'ropa',
    code: 'node001',
    stock: 50,
    status: true,
    thumbnails: []
  },
  {
    title: 'Zapatos deportivos',
    description: 'Zapatos cómodos para correr',
    price: 75.00,
    category: 'calzado',
    code: 'shoe001',
    stock: 30,
    status: true,
    thumbnails: []
  },
  {
    title: 'Smartphone X200',
    description: 'Teléfono inteligente con cámara avanzada',
    price: 399.99,
    category: 'tecnología',
    code: 'phone001',
    stock: 20,
    status: true,
    thumbnails: []
  },
  {
    title: 'Auriculares Bluetooth',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    price: 89.99,
    category: 'tecnología',
    code: 'headphone001',
    stock: 40,
    status: true,
    thumbnails: []
  },
  {
    title: 'Mochila escolar',
    description: 'Mochila resistente y espaciosa para la escuela',
    price: 45.50,
    category: 'accesorios',
    code: 'bag001',
    stock: 25,
    status: true,
    thumbnails: []
  },
  {
    title: 'Reloj inteligente',
    description: 'Smartwatch con seguimiento de actividad y salud',
    price: 120.00,
    category: 'tecnología',
    code: 'watch001',
    stock: 15,
    status: true,
    thumbnails: []
  },
  {
    title: 'Libro: JavaScript avanzado',
    description: 'Guía completa para desarrolladores JavaScript',
    price: 39.99,
    category: 'libros',
    code: 'book001',
    stock: 60,
    status: true,
    thumbnails: []
  },
  {
    title: 'Cámara deportiva',
    description: 'Cámara para grabar aventuras al aire libre',
    price: 150.00,
    category: 'tecnología',
    code: 'camera001',
    stock: 10,
    status: true,
    thumbnails: []
  },
  {
    title: 'Silla ergonómica',
    description: 'Silla cómoda para oficina y estudio',
    price: 99.99,
    category: 'muebles',
    code: 'chair001',
    stock: 12,
    status: true,
    thumbnails: []
  },
  {
    title: 'Gorra deportiva',
    description: 'Gorra ajustable para actividades al aire libre',
    price: 15.00,
    category: 'ropa',
    code: 'cap001',
    stock: 70,
    status: true,
    thumbnails: []
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');
    await Product.deleteMany({}); 
    await Product.insertMany(products);
    console.log(`✅ ${products.length} productos cargados`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al cargar productos:', err);
  });
