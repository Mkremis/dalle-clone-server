import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import connectDB from './mongoDB/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = express();

app
  .use(cors())
  .use(express.json({ limit: '50mb' }))
  .use('/api/v1/post', postRoutes)
  .use('/api/v1/dalle', dalleRoutes)
  .get('/', async (req, res) => {
    res.send('Hello from DALL-E');
  });

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server has started on port http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
