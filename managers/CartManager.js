const fs = require('fs');
const path = require('path');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async readFile() {
        try {
            if (!fs.existsSync(this.path)) return [];
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error leyendo el archivo:', error);
            return [];
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error escribiendo en el archivo:', error);
        }
    }

    async createCart() {
        const carts = await this.readFile();
        const newCart = {
            id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };

        carts.push(newCart);
        await this.writeFile(carts);
        return newCart;
    }

    async getCartById(cartId) {
        const carts = await this.readFile();
        return carts.find(cart => cart.id === cartId) || null;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const carts = await this.readFile();
        const cartIndex = carts.findIndex(cart => cart.id === cartId);

        if (cartIndex === -1) return null;

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(prod => prod.product === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        carts[cartIndex] = cart;
        await this.writeFile(carts);
        return cart;
    }
}

module.exports = CartManager;
