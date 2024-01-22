import axios from 'axios';
import { API_BASE_URL } from '@env';

export const uploadMediaToCloudinary = async (authtoken, role, formData) => {
  return await axios.post(
    `${API_BASE_URL}/upload-media`,
    { role, formData },
    {
      headers: {
        authtoken,
      },
    }
  );
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
