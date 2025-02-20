import Wishlist from "../model/Wishlist.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId);
            }
        }

        await wishlist.save();
        res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error adding to wishlist", error });
    }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
    const { userId } = req.params;

    try {
        const wishlist = await Wishlist.findOne({ userId }).populate("products");
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error });
    }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const wishlist = await Wishlist.findOne({ userId });

        if (wishlist) {
            wishlist.products = wishlist.products.filter(
                (id) => id.toString() !== productId
            );
            await wishlist.save();
            res.status(200).json({ message: "Product removed from wishlist", wishlist });
        } else {
            res.status(404).json({ message: "Wishlist not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error removing from wishlist", error });
    }
};
