import axios from 'axios';
import moment from 'moment';
import { tokenStatus } from '../constants';
const { READY } = tokenStatus;
export default {
  getTokens: async (teamNumber) => {
    let res = await axios.get(`/api/token?teamNumber=${teamNumber}`);
    return res.data || [];
  },

  getOneReadyToken: (teamNumber) => {
    const res = axios.get(`/api/getOneToken?teamNumber=${teamNumber}`);
    return res;
  },

  updateTokenStatus: (id, status, teamNumber) => {
    const res = axios.post(`/api/updateTokenStatus`, {
      id,
      status,
      teamNumber,
    });
    return res;
  },

  insertTokens: async (tokenValues, teamNumber) => {
    const reqBody = { tokenValues, teamNumber };
    console.log('reqBody', reqBody);
    let res = await axios.post(`/api/token`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data || [];
  },

  deleteAllTokens: async (teamNumber) => {
    const res = await axios.delete(
      `/api/deleteAllTokens?teamNumber=${teamNumber}`,
    );
    return res.data || '';
  },
};
