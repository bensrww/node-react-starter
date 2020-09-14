import tokenService from '../services/tokenService';
import { Modal } from 'antd';

export function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export const updateToken = async (id, status, teamNumber) => {
  const res = await tokenService.updateTokenStatus(id, status, teamNumber);
};

export const getAllTokens = async (teamNumber) => {
  let res = await tokenService.getTokens(teamNumber);
  return res;
};

export const getReadyToken = async (teamNumber) => {
  try {
    const res = await tokenService.getOneReadyToken(teamNumber);
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

export const getNumberOfTokens = async (teamNumber) => {
  try {
    const res = await tokenService.getNumberOfTokensService(teamNumber);
    return res.data;
  } catch (err) {
    Modal.error({
      title: 'Error',
      content: err.response.data.errorMsg,
    });
  }
};

export const clearAllToken = async (teamNumber) => {
  let res = await tokenService.deleteAllTokens(teamNumber);
  return res;
};
