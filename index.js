const CartManager = require('./managers/CartManager');
const cartManager = new CartManager('./data/carts.json');
const express = require('express');
const app = express();
const PORT = 8080;
const productsRouter = require('./routes/products.routes'); 
const cartsRouter = require('./routes/carts.routes');

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.post('/api/carts', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

app.get('/api/carts/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart);
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cartId, productId);

    if (!updatedCart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(updatedCart);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
