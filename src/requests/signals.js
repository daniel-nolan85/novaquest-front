import axios from 'axios';
import { API_BASE_URL } from '@env';

export const filterSignalsByDate = async (
  authtoken,
  _id,
  role,
  startDate,
  endDate
) => {
  return await axios.post(
    `${API_BASE_URL}/filter-signals-by-date`,
    { _id, role, startDate, endDate },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const filterSignalsByQuery = async (authtoken, _id, role, query) => {
  return await axios.post(
    `${API_BASE_URL}/filter-signals-by-query`,
    { _id, role, query },
    {
      headers: {
        authtoken,
      },
    }
  );
};
