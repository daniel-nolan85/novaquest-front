import axios from 'axios';
import { API_BASE_URL } from '@env';

export const submitPostWithImages = async (authtoken, _id, text, images) => {
  return await axios.post(
    `${API_BASE_URL}/submit-post-with-images`,
    { _id, text, images },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const submitPost = async (authtoken, _id, text) => {
  return await axios.post(
    `${API_BASE_URL}/submit-post`,
    { _id, text },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchPosts = async (authtoken) => {
  return await axios.get(`${API_BASE_URL}/news-feed`, {
    headers: {
      authtoken,
    },
  });
};

export const fetchUsersPosts = async (authtoken, _id) => {
  return await axios.post(
    `${API_BASE_URL}/users-posts`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
