import tokenService from '../services/tokenService';
import { Modal } from 'antd';

export function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export const updateToken = (id, status) => {
  console.log('update token', id, status);
};

export const getReadyToken = async () => {
  const displayErrModal = (msg) => {
    Modal.error({
      title: 'Error',
      content: msg,
    });
  };
  try {
    const res = await tokenService.getOneReadyToken();
    console.log('Get ready token ok', res);
    if (getSafe(() => res.data.value, null))
      this.setState({ currentToken: res.data });
  } catch (err) {
    console.log('getReadyToken err', err);
    displayErrModal(err.response.data.errorMsg);
  }
};
