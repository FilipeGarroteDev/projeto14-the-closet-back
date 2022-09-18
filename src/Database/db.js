/* eslint-disable no-console */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


try {
  mongoClient.connect();
} catch (error) {
  console.log(error.message);
}

const db = mongoClient.db('the-closet');

export default db;
