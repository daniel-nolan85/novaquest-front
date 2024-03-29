import axios from 'axios';
import { API_BASE_URL } from '@env';

export const uploadMediaToCloudinary = async (formData) => {
  console.log('uploadMediaToCloudinary => ', formData);
  return await axios.post(`${API_BASE_URL}/upload-media`, formData);
};

export const destroyMediaFromCloudinary = async (authtoken, role, publicId) => {
  console.log('destroyMediaFromCloudinary => ', authtoken, role, publicId);
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
