import express from 'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controller/wishlist-controller.js';

const router = express.Router();

// Login & Signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

// Product Routes
router.get('/products', getProducts);
router.get('/product/:id', getProductById);

// Wishlist Routes
router.post('/wishlist/add', addToWishlist);
router.get('/wishlist/:userId', getWishlist);
router.post('/wishlist/remove', removeFromWishlist);

// Payment Routes
router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

export default router;
