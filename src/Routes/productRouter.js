import express from 'express';
import * as productController from '../Controllers/product.controller.js';

const router = express.Router();

router.put('/product/:productId', productController.reviews);
router.get('/product', productController.product);
router.post('/cart', productController.addCart);
router.post('/wishlist', productController.addWishlist);

export default router;