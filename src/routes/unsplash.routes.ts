import { Router } from 'express';
import { searchUnsplash } from '../controllers/unsplash.controller.ts';

const router = Router();

const requestTimestamps: number[] = [];
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function rateLimiterMiddleware(req: any, res: any, next: any) {
  const now = Date.now();
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
    requestTimestamps.shift();
  }

  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  requestTimestamps.push(now);
  next();
}

router.get('/search', rateLimiterMiddleware, searchUnsplash);

export default router;
