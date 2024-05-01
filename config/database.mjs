import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.Vite_mongo_URI);

const db = mongoose.connection;

export default db.on('connected', () => {
  console.log(`Connected to ${db.name} at ${db.host}`);
});
