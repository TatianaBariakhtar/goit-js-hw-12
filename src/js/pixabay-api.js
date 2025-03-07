import axios from 'axios';

const API_KEY = "48897668-7102e16b6983a9d2c1f1ac079";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    
    if (response.data.hits.length === 0) {
      return { images: [], totalHits: 0 };
    }

    return {
      images: response.data.hits,  
      totalHits: response.data.totalHits, 
    };
  } catch (error) {
    console.error('❌ Error fetching images:', error);
    return { images: [], totalHits: 0 };
  }
}

