import * as axios from 'axios';
import messages from '@/shared/modules/notifications';
import { API } from '@/shared/config';
import NProgress from 'nprogress';
import { saveToken, destroyToken, getToken } from '../auth';

axios.interceptors.response.use((response) => {
  NProgress.start();
  return response;
},
(error) => {
  if (error.response.status === 401) {
    destroyToken();
  }
  return Promise.reject(error);
});

// before a response is returned stop nprogress
axios.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});
axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

const parseList = (response) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

const registerUser = async (user) => {
  try {
    // const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCLUcenhFZ3m2hbeKmR2Nf2UIYkWThbrg',
    //   { email: user.email, password: user.password, returnSecureToken: true });
    const response = await axios.post(`${API}/auth/register`, user);
    console.log(response);
    const data = parseItem(response, 201);
    messages({ type: 'info', message: 'User registrated successfully!' });
    saveToken(data);
    return data;
  } catch (error) {
    console.log(error);
    messages({ type: 'error', message: 'Email exists try another!' });
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials);
    // console.log(response);
    const data = parseList(response);
    saveToken(data);
    return data;
  } catch (error) {
    console.log(error);
    messages({ type: 'error', message: 'Wrong email or password!' });
  }
};

const logoutUser = async () => {
  await destroyToken();
};

const addDraw = async (draw) => {
  try {
    console.log(draw);
    const response = await axios.post(`${API}/draw/add`, draw);
    const addedDraw = parseItem(response, 201);
    return addedDraw;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getDraws = async () => {
  try {
    const response = await axios.get(`${API}/draw`);
    // console.log(response);
    const data = parseList(response);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getDraw = async (drawId) => {
  try {
    const response = await axios.get(`${API}/draw/${drawId}`);
    // console.log(response);
    const data = parseList(response);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const deleteDraw = async (draw) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const response = await axios.delete(`${API}/draw/delete/${draw._id}`);
    const deletedDraw = parseItem(response, 200);
    // eslint-disable-next-line no-underscore-dangle
    return deletedDraw._id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const dataServices = {
  loginUser,
  logoutUser,
  registerUser,
  addDraw,
  getDraws,
  getDraw,
  deleteDraw
};
export default dataServices;
