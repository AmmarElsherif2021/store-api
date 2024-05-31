// imageUtils.js

const fs = require('fs'); // For reading image files
const Product = require('./models/product'); // Your Product model
require('dotenv').config()
const connectDB = require('./db/connect');
let path = require('path')
//Update schema


let ids = [
    {
        "_id": "6644d6d27c0081202c14469c"
    },
    {
        "_id": "6644d6d27c0081202c144694"
    },
    {
        "_id": "6644d6d27c0081202c14468e"
    },
    {
        "_id": "6644d6d27c0081202c14469a"
    },
    {
        "_id": "6644d6d27c0081202c144696"
    },
    {
        "_id": "6644d6d27c0081202c144692"
    },
    {
        "_id": "6644d6d27c0081202c14469d"
    },
    {
        "_id": "6644d6d27c0081202c14468b"
    },
    {
        "_id": "6644d6d27c0081202c144695"
    },
    {
        "_id": "6644d6d27c0081202c14468f"
    },
    {
        "_id": "6644d6d27c0081202c144699"
    },
    {
        "_id": "6644d6d27c0081202c144697"
    },
    {
        "_id": "6644d6d27c0081202c144691"
    },
    {
        "_id": "6644d6d27c0081202c14469b"
    },
    {
        "_id": "6644d6d27c0081202c14468d"
    },
    {
        "_id": "6644d6d27c0081202c144693"
    },
    {
        "_id": "6644d6d27c0081202c14468a"
    },
    {
        "_id": "6644d6d27c0081202c14468c"
    },
    {
        "_id": "6644d6d27c0081202c144690"
    },
    {
        "_id": "6644d6d27c0081202c144698"
    }
]

// Save image data to a specific product document
async function saveImageToProduct(productId, imageFilePath) {
    try {
        await connectDB(process.env.MONGO_URI)
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


async function start() {
    Product.updateMany({}, { $set: { branch: 'image' } }, (err, res) => {
        if (err) {
            console.error('Error updating records:', err);
        } else {
            console.log('Records updated successfully:', res);
        }
    });
    ids.map((x) => {
        let imgPath = path.resolve(__dirname, `images/${x._id}.jpg`);
        try { saveImageToProduct(x._id, imgPath) } catch (err) { console.log(err) };
    })
}
start();

