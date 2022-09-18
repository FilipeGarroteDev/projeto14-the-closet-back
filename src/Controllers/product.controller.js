import db from '../Database/db.js';
import { cartAndWishlistSchema } from '../Schemas/cartAndWishlistValidation.js';
import { reviewsSchema } from '../Schemas/reviewsValidation.js';
import { ObjectId } from 'mongodb';

async function product (req, res) {
    try {
        const product = await db.collection('products').findOne({_id: ObjectId("63264a1a0b364e298be0e7d6")});
        res.status(200).send(product); 
    } catch (error) {
        return res.send(error.message);
      }
}

async function reviews (req, res) {

    const validation = reviewsSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    const { productId } = req.params;
    const newComment = req.body;
    console.log(productId)
    try {

        await db.collection('products').updateOne({
            _id: new ObjectId(productId)
        }, { $addToSet: {comments: newComment }});

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }
}

async function addCart (req, res) {

    const validation = cartAndWishlistSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send(401);
    }

    try {

        const session = await db.collection('sessions').findOne({
            token,
        });

        if (!session) {
            return res.send(401);
        }

        const user = await db.collection('users').findOne({
            _id: session.userId
        });

        if (!user) {
            return res.send(401);
        }

        const { color, size } = req.body;

        await db.collection('cart').insertOne({
            color,
            size
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

async function addWishlist (req, res) {

    const validation = cartAndWishlistSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send(401);
    }

    try {

        const session = await db.collection('sessions').findOne({
            token,
        });

        if (!session) {
            return res.send(401);
        }

        const user = await db.collection('users').findOne({
            _id: session.userId
        });

        if (!user) {
            return res.send(401);
        }

        const { color, size } = req.body;

        await db.collection('wishlist').insertOne({
            color,
            size
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

export { product, addCart, addWishlist, reviews }