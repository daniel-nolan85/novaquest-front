import axios from 'axios';
import { API_BASE_URL } from '@env';

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${API_BASE_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${API_BASE_URL}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
