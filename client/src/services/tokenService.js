import axios from 'axios';
import moment from 'moment';
import { tokenStatus } from '../constants';
const { READY } = tokenStatus;
export default {
  getOneReadyToken: async () => {
    let res = await axios.get(`/api/token`);
    return res.data || [];
  },

  insertTokens: async (tokenValue) => {
    const reqBody = {
      value: tokenValue,
      status: READY,
      timeStamp: moment().format('DD/MM/YYYY hh:mm'),
    };
    console.log('reqBody', reqBody);
    let res = await axios.post(`/api/token`, reqBody);
    return res.data || [];
  },
};
