import axios from 'axios';
import { API_BASE_URL } from '@env';

export const filterSignalsByDate = async (
  authtoken,
  _id,
  startDate,
  endDate
) => {
  return await axios.post(
    `${API_BASE_URL}/filter-signals-by-date`,
    { _id, startDate, endDate },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const filterSignalsByQuery = async (authtoken, _id, query) => {
  return await axios.post(
    `${API_BASE_URL}/filter-signals-by-query`,
    { _id, query },
    {
      headers: {
        authtoken,
      },
    }
  );
};
