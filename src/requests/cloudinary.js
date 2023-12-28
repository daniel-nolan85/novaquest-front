import axios from 'axios';
import { API_BASE_URL } from '@env';

export const uploadImagesToCloudinary = async (authtoken, formData) => {
  return await axios.post(`${API_BASE_URL}/upload-images`, formData, {
    headers: {
      authtoken,
    },
  });
};
