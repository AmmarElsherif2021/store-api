const Product = require("../models/product");

getAllProductsStatic = async (req, res) => {
    //throw new Error('Testing async errors');
    const search = 'e'
    console.log('All products -static- are accessed');
    const products = await Product.find({}).sort('rating');
    res.status(200).json({ products, nHits: products.length })
};
//query specific products
getAllProducts = async (req, res) => {
    console.log(req.query);
    const { featured, company, name, rating, fields, sort, numericFilters } = req.query;
    const queryObject = {};

    // Correctly convert the featured flag to a boolean
    if (featured) {
        queryObject.featured = featured === 'true';
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (rating) {
        queryObject.rating = Number(rating);
    }

    // Fix the numericFilters implementation
    if (numericFilters) {
        const filtersMap = {
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
            '>': '$gt',
            '>=': '$gte',
        };
        const regex = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regex, (match) => `-${filtersMap[match]}-`);
        const options = ['price', 'rating'];

        filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [filtersMap[operator]]: Number(value) };
            }
        });
    }

    // Implement select and sort functionalities
    let result = Product.find(queryObject);
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    // Implement pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // Execute the query and send the response
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};

getATrialMsg = async (req, res) => {
    console.log('Exposing Trial msg ');
    res.status(200).json({ msg: 'trial msg' })
}
module.exports = {
    getAllProducts, getAllProductsStatic, getATrialMsg
}
