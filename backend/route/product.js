import express from "express";
import {
    getProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    filterProducts,
    sortProducts,
    getReviewsForProduct,
    addReview
} from "../controller/product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);  
router.get("/search", searchProducts);
router.get("/filter", filterProducts);
router.get("/sort", sortProducts);

router.get("/:id/reviews", getReviewsForProduct);
router.post("/:id/reviews", addReview);

router.get("/:id", getProductById);

export default router;
