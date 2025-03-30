const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager('./data/products.json');


router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
});


router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(Number(pid));
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
});


router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }
    const newProduct = { title, description, code, price, status, stock, category, thumbnails };
    try {
        const product = await productManager.addProduct(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto", error });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: "No se enviaron datos para actualizar" });
    }

    try {
        const updatedProduct = await productManager.updateProduct(Number(pid), updatedFields);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productManager.deleteProduct(Number(pid));
        if (!result) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
});

module.exports = router;
