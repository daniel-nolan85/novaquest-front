import axios from 'axios';
import { API_BASE_URL } from '@env';

export const updateTextSpeed = async (authtoken, _id, textSpeed) => {
  return await axios.put(
    `${API_BASE_URL}/update-text-speed`,
    { _id, textSpeed },
    {
      headers: {
        authtoken,
      },
    }
  );
};
