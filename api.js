import axios from 'axios';
import {Appwrite} from 'appwrite';


const API_ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '6506b95c5bb71620d8b7';
const COLLECTION_ID = '650724f80dce0a237953';

export const getMovies = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/database/${PROJECT_ID}/collections/${COLLECTION_ID}/documents`
    );

    if (response.data.documents) {
      return response.data.documents.map((doc) => ({
        key: doc.$id,
        title: doc.original_title,
        description: doc.overview,
        poster: doc.poster_path,
        backdrop: doc.backdrop_path,
      }));
    } else {
      throw new Error('Error fetching movies: Response format invalid');
    }
  } catch (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }
};

