import axios from 'axios';
import { API_BASE_URL } from '@env';

export const fetchLeaderboard = async (authtoken) => {
  return await axios.get(`${API_BASE_URL}/fetch-leaderboard`, {
    headers: {
      authtoken,
    },
  });
};

export const filterPlayersByQuery = async (authtoken, query) => {
  return await axios.post(
    `${API_BASE_URL}/filter-players-by-query`,
    { query },
    {
      headers: {
        authtoken,
      },
    }
  );
};
