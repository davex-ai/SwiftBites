import { addToWishlist, getWishlist, removeFromWishlist } from "../utils/wishlist";

export async function addProductToWishlist(req, res) {
    try {
        const { productId } = req.body;

        const wishlist = await addToWishlist(req.user.id, productId);

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function removeProductFromWishlist(req, res) {
    try {
        const { productId } = req.body;

        const wishlist = await removeFromWishlist(req.user.id, productId);

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getUserWishlist(req, res) {
    try {
        const wishlist = await getWishlist(req.user.id);

        res.status(200).json(wishlist || { products: [] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
