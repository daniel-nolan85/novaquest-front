import axios from 'axios';
import { API_BASE_URL } from '@env';

export const fetchLeaderboard = async (authtoken, role) => {
  return await axios.post(
    `${API_BASE_URL}/fetch-leaderboard`,
    { role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const filterPlayersByQuery = async (authtoken, role, query) => {
  return await axios.post(
    `${API_BASE_URL}/filter-players-by-query`,
    { role, query },
    {
      headers: {
        authtoken,
      },
    }
  );
};
