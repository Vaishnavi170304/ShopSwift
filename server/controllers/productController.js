import Product from '../models/products.js';

// add product
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? req.file.filename : '';

    // Validate required fields
    if (!title || !description || !price || !image || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      category
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } 
  catch (error) {
    console.error("Product creation error:", error); // Full error printed to terminal
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

// Get Products Controller
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt : -1 });
    res.json(products);
  } 
  catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const updateData = { title, description, price };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedProduct);
  } 
  catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } 
  catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};
