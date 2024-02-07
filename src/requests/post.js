import axios from 'axios';
import { API_BASE_URL } from '@env';

export const submitPostWithMedia = async (
  authtoken,
  _id,
  role,
  text,
  media,
  explorers
) => {
  return await axios.post(
    `${API_BASE_URL}/submit-post-with-media`,
    { _id, role, text, media, explorers },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const submitPost = async (authtoken, _id, role, text, explorers) => {
  return await axios.post(
    `${API_BASE_URL}/submit-post`,
    { _id, role, text, explorers },
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
  role,
  text,
  media,
  mediaToDelete,
  postId
) => {
  return await axios.put(
    `${API_BASE_URL}/edit-post-with-media`,
    { _id, role, text, media, mediaToDelete, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const editPost = async (
  authtoken,
  _id,
  role,
  text,
  mediaToDelete,
  postId
) => {
  return await axios.put(
    `${API_BASE_URL}/edit-post`,
    { _id, role, text, mediaToDelete, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deletePost = async (authtoken, _id, role, postId) => {
  return await axios.put(
    `${API_BASE_URL}/delete-post`,
    { _id, role, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchPosts = async (authtoken, _id, role, page, pageSize) => {
  console.log('fetchPosts => ', authtoken, _id, role, page, pageSize);
  return await axios.post(
    `${API_BASE_URL}/news-feed`,
    { _id, role, page, pageSize },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchSinglePost = async (authtoken, role, postId) => {
  return await axios.post(
    `${API_BASE_URL}/single-post`,
    { role, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersPosts = async (
  authtoken,
  _id,
  role,
  page,
  pageSize,
  initialIndex
) => {
  return await axios.post(
    `${API_BASE_URL}/users-posts`,
    { _id, role, page, pageSize, initialIndex },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchUsersStars = async (
  authtoken,
  _id,
  role,
  page,
  pageSize,
  initialIndex
) => {
  return await axios.post(
    `${API_BASE_URL}/users-stars`,
    { _id, role, page, pageSize, initialIndex },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const handleLikePost = async (authtoken, _id, role, postId) => {
  return await axios.put(
    `${API_BASE_URL}/like-post`,
    { _id, role, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const handleUnlikePost = async (authtoken, _id, role, postId) => {
  return await axios.put(
    `${API_BASE_URL}/unlike-post`,
    { _id, role, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addComment = async (authtoken, _id, role, postId, text) => {
  return await axios.put(
    `${API_BASE_URL}/add-comment`,
    { _id, role, postId, text },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getComments = async (authtoken, role, postId) => {
  return await axios.post(
    `${API_BASE_URL}/get-comments`,
    { role, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const reportContent = async (authtoken, role, postId) => {
  return await axios.post(
    `${API_BASE_URL}/report-post`,
    { role, postId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const filterPostsByQuery = async (authtoken, role, query) => {
  return await axios.post(
    `${API_BASE_URL}/filter-posts-by-query`,
    { role, query },
    {
      headers: {
        authtoken,
      },
    }
  );
};
