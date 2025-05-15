import Cart from '../models/Cart.js';

class CartManager {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  async getCartById(cid) {
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) throw new Error('Carrito no encontrado');
    return cart;
  }

  async addProductToCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const productInCart = cart.products.find(p => p.product.toString() === pid);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    return await cart.save();
  }

  async removeProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    return await cart.save();
  }

  async updateCartProducts(cid, newProductsArray) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = newProductsArray;
    return await cart.save();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const product = cart.products.find(p => p.product.toString() === pid);
    if (!product) throw new Error('Producto no encontrado en el carrito');

    product.quantity = quantity;
    return await cart.save();
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = [];
    return await cart.save();
  }
}

export default CartManager;
