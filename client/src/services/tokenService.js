import axios from 'axios';
import moment from 'moment';
import { tokenStatus } from '../constants';
const { READY } = tokenStatus;
export default {
  getTokens: async () => {
    let res = await axios.get(`/api/token`);
    return res.data || [];
  },

  getOneReadyToken: () => {
    const res = axios.get(`/api/randomToken`);
    return res;
  },

  updateTokenStatus: (id, status) => {
    const res = axios.post(`/api/updateTokenStatus`, { id, status });
    return res;
  },

  insertTokens: async (tokenValues) => {
    const reqBody = { tokenValues };
    console.log('reqBody', reqBody);
    let res = await axios.post(`/api/token`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data || [];
  },
};
