import axios from 'axios';
import { API_BASE_URL } from '@env';

export const fetchReportedPosts = async (authtoken, role) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-reported-posts`,
    { role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchAllPosts = async (authtoken, role) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-all-posts`,
    { role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchAllUsers = async (authtoken, role) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-all-users`,
    { role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteUser = async (authtoken, role, userId) => {
  return await axios.put(
    `${API_BASE_URL}/delete-user`,
    { role, userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
