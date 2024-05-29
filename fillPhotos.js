// imageUtils.js

const fs = require('fs'); // For reading image files
const Product = require('./models/product'); // Your Product model

// Save image data to a specific product document
async function saveImageToProduct(productId, imageFilePath) {
    try {
        const imageBuffer = fs.readFileSync(imageFilePath);
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        product.image = imageBuffer;
        await product.save();
        console.log('Image saved successfully for product:', product.name);
    } catch (error) {
        console.error('Error saving image:', error.message);
    }
}

// Retrieve image data for a specific product
async function getImageForProduct(productId) {
    try {
        const product = await Product.findById(productId);
        if (!product || !product.image) {
            throw new Error('Image not found');
        }
        return product.image;
    } catch (error) {
        console.error('Error retrieving image:', error.message);
        return null;
    }
}

module.exports = { saveImageToProduct, getImageForProduct };
