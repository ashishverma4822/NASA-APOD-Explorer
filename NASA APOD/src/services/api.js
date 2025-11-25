import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getApodToday = async (date) => {
  try {
    const params = date ? { date } : {}; 
    const response = await api.get('/apod', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentApods = async (count = 10) => {
  try {
    const response = await api.get(`/apod/recent?count=${count}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getApodByDate = async (date) => {
  try {
    const response = await api.get(`/apod?date=${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentApod = async () => {
  try {
    const response = await api.get('/apod/recent');
    return response.data;
  } catch (error) {
    throw error;
}
};

export const getLastWeekApod = async () => {
  try {
    const response = await api.get('/apod/last-week');
    return response.data;
  } catch (error) {
    throw error;
  }
};