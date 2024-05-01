import db from './config/database.mjs';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import todoRoutes from './routes/api/todos.mjs';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

//middleware
app.use(express.json());
app.use((req, res, next) => {
  res.locals.data = {};
  next();
});
app.use(logger('dev'));
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/todos', todoRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
