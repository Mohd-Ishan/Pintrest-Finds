import productModel from "../models/Product.js";
import fs from 'fs'

// Add Product
const addproduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Map all uploaded files to their filenames
    const image_filenames = req.files.map((file) => file.filename);

    const product = new productModel({
      name,
      description,
      price,
      image: image_filenames, // <-- store all image filenames here
      category,
    });

    await product.save();
    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while adding product" });
  }
};

// list Product

const listproduct = async (req,res)=>{
  try{
    const products = await productModel.find({});
    res.json({success:true,data:products})
  }catch(error){

  }
}

const removeproduct = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // delete each image file safely
    product.image.forEach((imageName) => {
      const imagePath = `upload/${imageName}`;
      fs.unlink(imagePath, (err) => {
        if (err) console.log(`Failed to delete ${imagePath}:`, err.message);
      });
    });

    // finally remove the product from DB
    await productModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Product and images removed successfully" });
  } catch (error) {
    console.log("Error removing product:", error);
    res.json({ success: false, message: "Error removing product" });
  }
};

export { addproduct, listproduct,removeproduct};
