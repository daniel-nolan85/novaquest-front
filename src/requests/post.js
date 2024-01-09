import axios from 'axios';
import { API_BASE_URL } from '@env';

export const submitPostWithMedia = async (authtoken, _id, text, media) => {
  return await axios.post(
    `${API_BASE_URL}/submit-post-with-media`,
    { _id, text, media },
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

export const editPostWithMedia = async (
  authtoken,
  _id,
  text,
  media,
  mediaToDelete,
  postId
) => {
  return await axios.put(
    `${API_BASE_URL}/edit-post-with-media`,
    { _id, text, media, mediaToDelete, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const editPost = async (authtoken, _id, text, mediaToDelete, postId) => {
  return await axios.put(
    `${API_BASE_URL}/edit-post`,
    { _id, text, mediaToDelete, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deletePost = async (authtoken, _id, postId) => {
  return await axios.put(
    `${API_BASE_URL}/delete-post`,
    { _id, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchPosts = async (authtoken, _id, page, pageSize) => {
  return await axios.post(
    `${API_BASE_URL}/news-feed`,
    { _id, page, pageSize },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchSinglePost = async (authtoken, postId) => {
  return await axios.post(
    `${API_BASE_URL}/single-post`,
    { postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersPosts = async (authtoken, _id, page, pageSize) => {
  return await axios.post(
    `${API_BASE_URL}/users-posts`,
    { _id, page, pageSize },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersStars = async (authtoken, _id, page, pageSize) => {
  return await axios.post(
    `${API_BASE_URL}/users-stars`,
    { _id, page, pageSize },
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

export const reportContent = async (authtoken, postId) => {
  return await axios.post(
    `${API_BASE_URL}/report-post`,
    { postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const filterPostsByQuery = async (authtoken, query) => {
  return await axios.post(
    `${API_BASE_URL}/filter-posts-by-query`,
    { query },
    {
      headers: {
        authtoken,
      },
    }
  );
};
