import tokenService from '../services/tokenService';
import { Modal } from 'antd';

export function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export const updateToken = async (id, status) => {
  const res = await tokenService.updateTokenStatus(id, status);
  console.log('update token', id, status, res);
};

export const getAllTokens = async () => {
  let res = await tokenService.getTokens();
  console.log('getAllTokens', res);
  return res;
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
    if (getSafe(() => res.data.value, null)) {
      return { currentToken: res.data };
    }
  } catch (err) {
    console.log('getReadyToken err', err);
    displayErrModal(err.response.data.errorMsg);
  }
};
