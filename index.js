import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.router.js';
import dotenv from 'dotenv';
import session from 'express-session';
import authRouter from './routes/auth.routes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/api/auth', authRouter);


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));
import CartManager from './managers/CartManager.js';

const cartManager = new CartManager();

app.use(async (req, res, next) => {
  try {
    if (!req.session.cartId) {
      const newCart = await cartManager.createCart();
      req.session.cartId = newCart._id.toString();
      console.log('Carrito creado y asignado a sesión:', req.session.cartId);
    }
    next();
  } catch (error) {
    next(error);
  }
});
app.use((req, res, next) => {
  res.locals.cartId = req.session.cartId || null;
  next();
});


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.use('/', viewsRouter);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.engine('handlebars', handlebars.engine({
  helpers: {
    multiply: (a, b) => a * b,
    calculateTotal: (products) => {
      return products.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2);
    }
  }
}));
