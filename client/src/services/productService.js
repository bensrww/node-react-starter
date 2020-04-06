import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/product`);
    return res.data || [];
  },

  insertOneProduct: async () => {
    const reqBody = {
      name: 'Switch',
      description: 'Nintendo console',
    };
    console.log('reqBody', reqBody);
    let res = await axios.post(`/api/product`, reqBody);
    return res.data || [];
  },
};
