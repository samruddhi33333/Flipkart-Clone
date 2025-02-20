import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ 
        id: String,
        name: String,
        price: Number,
        description: String,
        image: String
    }]
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
export default Wishlist;
