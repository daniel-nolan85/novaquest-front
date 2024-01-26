import axios from 'axios';
import { API_BASE_URL } from '@env';

export const checkBlockedList = async (ip, email) => {
  return await axios.post(`${API_BASE_URL}/check-blocked-list`, { ip, email });
};

export const createOrUpdateUser = async (authtoken, ip) => {
  return await axios.post(
    `${API_BASE_URL}/create-or-update-user`,
    { ip },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createGuestUser = async (role) => {
  return await axios.post(`${API_BASE_URL}/create-guest-user`, { role });
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

export const storeNotifToken = async (
  authtoken,
  _id,
  role,
  notificationToken
) => {
  return await axios.put(
    `${API_BASE_URL}/store-notification-token`,
    { _id, role, notificationToken },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteAccount = async (authtoken, userId, role) => {
  return await axios.put(
    `${API_BASE_URL}/delete-account`,
    { userId, role },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const sendMessage = async (
  authtoken,
  role,
  name,
  email,
  subject,
  message
) => {
  return await axios.post(
    `${API_BASE_URL}/send-email`,
    { role, name, email, subject, message },
    {
      headers: {
        authtoken,
      },
    }
  );
};
