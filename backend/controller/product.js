import {
    getProducts as getProductsUtil,
    getProduct,
    getProductsByCategory as getProductsByCategoryUtil,
    createProduct,
    updateProduct,
    deleteProduct
} from "../utils/product.js";
import Product from "../model/Product.js";

export async function getProducts(req, res) {
    try {
        const products = await getProductsUtil();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getProductById(req, res) {
    try {
        const product = await getProduct(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getProductsByCategory(req, res) {
    try {
        const products = await getProductsByCategoryUtil(req.params.category);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function searchProducts(req, res) {
    try {
        const { query } = req.query;
        const products = await Product.find({name: {$regex: query, $options: "i"}})
        res.status(200).json(products); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function filterProducts(req, res) {
    try {
        const query = {}

        if (req.query.category) query.category = req.query.category

        if(req.query.min || req.query.max){
            query.price = {}
             if (req.query.min) query.price.$gte = req.query.min;
             if (req.query.max) query.price.$lte = req.query.max;
        }

          if (req.query.inStock) {
                    query.stock = { $gt: 0 };
                }

                      if (req.query.rating) {
                            query.rating = { $gte: req.query.rating };
                        }

                const products = await Product.find(query);        

        res.status(200).json(products); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function sortProducts(req, res) {
    try {
        let { by, order } = req.query;

        order = order === "desc" ? -1 : 1; 

        let sortOption = {};

        switch (by) {
            case "price":
                sortOption.price = order;
                break;

            case "newest":
                sortOption.createdAt = order;
                break;

            case "popularity":
                sortOption.numReviews = order; 
                break;

            default:
                return res.status(400).json({
                    message: "Invalid sort type. Use price, newest, popularity."
                });
        }

        const products = await Product.find().sort(sortOption);

        return res.status(200).json(products);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export async function getReviewsForProduct(req, res) {
    try {
const product = await Product.findId(req.params.id).select("reviews") 
if (!product) return res.status(404).json({ message: "Product not found" });
res.status(200).json(product.reviews || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function addReview(req, res) {
    try {
          const { rating, comment } = req.query;
          if(!product) return res.status(404).json({message: "Product not faound"})
            const review = {rating, comment, createdAt: new Date()}
        product.review.push(review)
        const product = await updateProduct(id, review)
        res.status(200).json(product);  product.numReviews = product.reviews.length;
                await product.save();
        
                res.status(201).json({ message: "Review added", reviews: product.reviews });       
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
