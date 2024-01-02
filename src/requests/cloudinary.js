import axios from 'axios';
import { API_BASE_URL } from '@env';

export const uploadMediaToCloudinary = async (authtoken, formData) => {
  return await axios.post(`${API_BASE_URL}/upload-media`, formData, {
    headers: {
      authtoken,
    },
  });
};
