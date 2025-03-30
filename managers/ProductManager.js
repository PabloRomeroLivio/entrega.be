const fs = require('fs');
const path = require('path');

class ProductManager {
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


    async getProducts() {
        return await this.readFile();
    }

   
    async getProductById(id) {
        const products = await this.readFile();
        return products.find(prod => prod.id === id) || null;
    }


    async addProduct(product) {
        const products = await this.readFile();
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id, ...product };
        products.push(newProduct);
        await this.writeFile(products);
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        let products = await this.readFile();
        const index = products.findIndex(prod => prod.id === id);
        if (index === -1) return null; 

      
        products[index] = { ...products[index], ...updatedFields, id };
        await this.writeFile(products); 
        return products[index]; 
    }

    async deleteProduct(id) {
        let products = await this.readFile();
        const filteredProducts = products.filter(prod => prod.id !== id);

        if (products.length === filteredProducts.length) return false;

        await this.writeFile(filteredProducts);
        return true;
    }
}

module.exports = ProductManager;
