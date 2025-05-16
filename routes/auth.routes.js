import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import Cart from '../models/Cart.js';

const router = Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Crear carrito si no tiene
    if (!user.cart) {
      const newCart = await Cart.create({ products: [] });
      user.cart = newCart._id;
      await user.save();
    }

    // Guardar cartId en la sesión
    req.session.cartId = user.cart.toString();

    // Redirigir al listado de productos
    res.redirect('/products');

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

export default router;
