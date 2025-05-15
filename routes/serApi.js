// routes/serpApi.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/reverse-image-search', async (req, res) => {
  const { imageUrl,textPrompt } = req.body;
  
  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_reverse_image',
        image_url: imageUrl,
        api_key:process.env.SERPAPI_KEY
      }
    });

    // Optional: Also trigger a regular Google search with the text prompt
    const textSearch = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google',
        q: textPrompt,
        api_key: process.env.SERPAPI_KEY
      }
    });

    return res.json({
      imageResponse: response.data.image_results,
      textResponse: textSearch.data.inline_images
    });
  } catch (error) {
    console.error('Error fetching from SerpAPI:', error.message);
    res.status(500).json({ error: 'Failed to fetch image search results' });
  }
});

router.get('/',async(req,res,next)=>{
  try {
    return res.json({message:"THIS IS RESPONSE"})
  } catch (error) {
    console.error('Error fetching from SerpAPI:', error.message);
    res.status(500).json({ error: 'Failed to fetch image search results' });
  }
})

export default router;
