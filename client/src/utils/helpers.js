import tokenService from '../services/tokenService';

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
  try {
    const res = await tokenService.getOneReadyToken();
    console.log('Get ready token ok', res);
    if (getSafe(() => res.data.value, null))
      this.setState({ currentToken: res.data });
  } catch (err) {
    this.displayErrModal(err.response.data.errorMsg);
  }
};
