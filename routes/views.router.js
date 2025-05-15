
import { Router } from 'express';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean(); 
    res.render('home', { products });
  } catch (err) {
    res.status(500).send('Error al cargar los productos');
  }
});


router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else {
        filter.category = query;
      }
    }

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const result = await Product.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true
    });

    res.render('products', {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      totalPages: result.totalPages
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/cart', async (req, res) => {
  try {
    const cartId = req.session.cartId;
    if (!cartId) return res.status(404).send('No hay carrito en sesión');

    const cart = await Cart.findById(cartId).populate('products.product').lean();
    if (!cart) return res.status(404).send('Carrito no encontrado');

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
