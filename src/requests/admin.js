import axios from 'axios';
import { API_BASE_URL } from '@env';

export const fetchReportedPosts = async (authtoken) => {
  return await axios.get(`${API_BASE_URL}/fetch-reported-posts`, {
    headers: {
      authtoken,
    },
  });
};

export const fetchAllPosts = async (authtoken) => {
  return await axios.get(`${API_BASE_URL}/fetch-all-posts`, {
    headers: {
      authtoken,
    },
  });
};

export const fetchAllUsers = async (authtoken) => {
  return await axios.get(`${API_BASE_URL}/fetch-all-users`, {
    headers: {
      authtoken,
    },
  });
};
