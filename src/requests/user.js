import axios from 'axios';
import { API_BASE_URL } from '@env';

export const updateUserName = async (authtoken, _id, name) => {
  return await axios.put(
    `${API_BASE_URL}/update-user-name`,
    { _id, name },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const badgeUnlocked = async (authtoken, _id, badge) => {
  return await axios.put(
    `${API_BASE_URL}/badge-unlocked`,
    { _id, badge },
    {
      headers: {
        authtoken,
      },
    }
  );
};

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
