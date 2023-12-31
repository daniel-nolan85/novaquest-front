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

export const fetchPosts = async (authtoken, _id) => {
  return await axios.post(
    `${API_BASE_URL}/news-feed`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
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

export const fetchUsersStars = async (authtoken, _id) => {
  return await axios.post(
    `${API_BASE_URL}/users-stars`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const handleLikePost = async (authtoken, _id, postId) => {
  return await axios.put(
    `${API_BASE_URL}/like-post`,
    { _id, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const handleUnlikePost = async (authtoken, _id, postId) => {
  return await axios.put(
    `${API_BASE_URL}/unlike-post`,
    { _id, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addComment = async (authtoken, _id, postId, text) => {
  return await axios.put(
    `${API_BASE_URL}/add-comment`,
    { _id, postId, text },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getComments = async (authtoken, postId) => {
  return await axios.post(
    `${API_BASE_URL}/get-comments`,
    { postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
