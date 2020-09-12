import tokenService from '../services/tokenService';
import { Modal } from 'antd';

export function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export const updateToken = async (id, status, teamNum) => {
  const res = await tokenService.updateTokenStatus(id, status, teamNum);
};

export const getAllTokens = async (teamNum) => {
  let res = await tokenService.getTokens(teamNum);
  return res;
};

export const getReadyToken = async (teamNum) => {
  try {
    const res = await tokenService.getOneReadyToken(teamNum);
    console.log('Get ready token ok', res);
    if (getSafe(() => res.data.value, null)) {
      return { currentToken: res.data };
    }
  } catch (err) {
    Modal.error({
      title: 'Error',
      content: err.response.data.errorMsg,
    });
  }
};

export const clearAllToken = async (teamNum) => {
  let res = await tokenService.deleteAllTokens(teamNum);
  return res;
};
