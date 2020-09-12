import axios from 'axios';
import moment from 'moment';
import { tokenStatus } from '../constants';
const { READY } = tokenStatus;
export default {
  getTokens: async (teamNum) => {
    let res = await axios.get(`/api/token?teamNum=${teamNum}`);
    return res.data || [];
  },

  getOneReadyToken: (teamNum) => {
    const res = axios.get(`/api/getOneToken?teamNum=${teamNum}`);
    return res;
  },

  updateTokenStatus: (id, status, teamNum) => {
    const res = axios.post(`/api/updateTokenStatus`, { id, status, teamNum });
    return res;
  },

  insertTokens: async (tokenValues, teamNum) => {
    const reqBody = { tokenValues, teamNum };
    console.log('reqBody', reqBody);
    let res = await axios.post(`/api/token`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data || [];
  },

  deleteAllTokens: async (teamNum) => {
    const res = await axios.delete(`/api/deleteAllTokens?teamNum=${teamNum}`);
    return res.data || '';
  },
};
