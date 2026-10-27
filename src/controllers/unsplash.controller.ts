import type { Request, Response } from 'express';
import axios from 'axios';

export async function searchUnsplash(req: Request, res: Response) {
  const { query, page } = req.query;
  
  if (!query || String(query).trim() === '') {
    return res.status(400).json({ error: 'Query is required and cannot be empty' });
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { 
        query: String(query), 
        page: page ? Number(page) : 1,
        per_page: 10 
      },
      headers: { 
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS}` 
      },
      timeout: 10000
    });

    return res.json({
      results: response.data.results || [],
      total: response.data.total || 0,
      total_pages: response.data.total_pages || 0
    });
  } catch (err: any) {
    const status = err.response?.status || 504;
    const errorMessage = err.response?.data?.errors?.[0] || 'Network timeout, rate limit exceeded, or offline';
    return res.status(status).json({ error: errorMessage });
  }
}
