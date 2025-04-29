const CartManager = require('./managers/CartManager');
const cartManager = new CartManager('./data/carts.json');
const express = require('express');
const app = express();
const productsRouter = require('./routes/products.routes'); 
const cartsRouter = require('./routes/carts.routes');
const exphbs = require('express-handlebars');
const path = require('path');
const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager('./data/products.json');

const PORT = 8080;

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { title: 'Productos', products });
});


app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { title: 'Productos en tiempo real', products });
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.post('/api/carts', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

app.get('/api/carts/:cid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cartId);

  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

  res.json(cart);
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const updatedCart = await cartManager.addProductToCart(cartId, productId);

  if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });

  res.json(updatedCart);
});


io.on('connection', async socket => {
    console.log('Cliente conectado');


    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

 
    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts); 
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);  
    });
});


server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
