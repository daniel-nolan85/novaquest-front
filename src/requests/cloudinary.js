import axios from 'axios';
import { API_BASE_URL } from '@env';

export const uploadMediaToCloudinary = async (formData) => {
  console.log('uploading', formData);
  return await axios.post(`${API_BASE_URL}/upload-media`, formData);
};

export const destroyMediaFromCloudinary = async (authtoken, role, publicId) => {
  return await axios.post(
    `${API_BASE_URL}/destroy-media`,
    { role, publicId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
