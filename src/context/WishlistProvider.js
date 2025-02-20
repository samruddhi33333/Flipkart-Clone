import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist on load
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const { data } = await axios.get(`http://localhost:8000/wishlist/${userId}`);
                    setWishlist(data?.products || []);
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
        fetchWishlist();
    }, []);

    // Add to wishlist
    const addToWishlist = async (productId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Please login first!");
                return;
            }

            await axios.post("http://localhost:8000/wishlist/add", { userId, productId });
            setWishlist((prev) => [...prev, productId]); // Update UI
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    // Remove from wishlist
    const removeFromWishlist = async (productId) => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.post("http://localhost:8000/wishlist/remove", { userId, productId });
            setWishlist((prev) => prev.filter((id) => id !== productId));
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;
