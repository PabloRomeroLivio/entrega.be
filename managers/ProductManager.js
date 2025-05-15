import Product from '../models/Product.js';

class ProductManager {
  async getProducts({ limit = 10, page = 1, sort, category, status }) {
    const query = {};
    if (category) query.category = category;
    if (status !== undefined) query.status = status === 'true';

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    return await Product.paginate(query, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
    });
  }

  async getProductById(pid) {
    const product = await Product.findById(pid);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  }

  async addProduct(data) {
    const requiredFields = ['title', 'description', 'price', 'category', 'stock', 'code'];
    for (const field of requiredFields) {
      if (!data[field]) throw new Error(`Falta el campo obligatorio: ${field}`);
    }

    const newProduct = new Product({
      ...data,
      status: data.status !== undefined ? data.status : true,
      thumbnails: data.thumbnails || [],
    });

    return await newProduct.save();
  }

  async updateProduct(pid, data) {
    const updated = await Product.findByIdAndUpdate(pid, data, { new: true });
    if (!updated) throw new Error('Producto no encontrado');
    return updated;
  }

  async deleteProduct(pid) {
    const deleted = await Product.findByIdAndDelete(pid);
    if (!deleted) throw new Error('Producto no encontrado');
    return deleted;
  }
}

export default ProductManager;
