import axios from 'axios';
import { API_BASE_URL } from '@env';

export const checkBlockedList = async (email) => {
  return await axios.get(`${API_BASE_URL}/check-blocked-list/${email}`);
};

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

export const storeNotifToken = async (authtoken, _id, notificationToken) => {
  return await axios.put(
    `${API_BASE_URL}/store-notification-token`,
    { _id, notificationToken },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteAccount = async (authtoken, userId) => {
  console.log({ userId });
  return await axios.put(
    `${API_BASE_URL}/delete-account`,
    { userId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
