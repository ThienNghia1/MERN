import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => { 
    try {
      const products = await Product.find({});
    res.status(200).json({success:true, data: products});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const createProduct = (req, res) => {  
    const product  = req.body; // user will send data
  
    if(!product.name || !product.price || !product.image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const newProduct = new Product(product);
  
    try {
      newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(id)) 
      return res.status(404).json({ success: false, message: 'Invalid product id' });
    try{
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
      res.status(200).json(updatedProduct);
    }catch(error){
      res.status(500).json({ success: false, message: 'Internal Server Error' }); 
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
  
    }catch(error){
      console.log("error deleting product", error.message);
      res.status(404).json({ success: false, message: 'product not found' });
    }
  
};
