import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import unsplashRouter from './routes/unsplash.routes.ts';
import {type Request, type Response} from 'express'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173"}));
app.use(express.json());

app.use('/api/unsplash', unsplashRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'drawngle-backend' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Drawngle backend server running on port ${PORT}`);
  });
}

export default app;
