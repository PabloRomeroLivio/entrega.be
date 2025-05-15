import { Router } from 'express';
import Product from '../models/Product.js';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

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

 
    const newCart = await cartManager.createCart();

    res.render('products', {
      products: result.docs,
      pagination: {
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        currentPage: result.page,
        totalPages: result.totalPages
      },
      cartId: newCart._id.toString()
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/products', async (req, res) => {
  try {
    const productData = req.body; 
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/products/:pid', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
