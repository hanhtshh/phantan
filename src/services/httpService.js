import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: `https://5c70-103-156-42-98.ngrok-free.app`,
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const SERVER_HOSt = 'https://5c70-103-156-42-98.ngrok-free.app'

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let adminInfo;
  if (Cookies.get('adminInfo')) {
    adminInfo = JSON.parse(Cookies.get('adminInfo'));
  }

  return {
    ...config,
    headers: {
      authorization: adminInfo ? `${adminInfo.token}` : null,
    },
  };
});

const responseBody = (response) => {
  if (response?.data?.data) {
    return response.data.data
  }
  return response
};

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
