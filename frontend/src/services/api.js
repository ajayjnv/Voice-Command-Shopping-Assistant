import axios from 'axios';

const API_URL = 'http://localhost:5000/api/shopping';

export const addItem = (data) => axios.post(`${API_URL}/add`, data);
export const getList = (userId) => axios.get(`${API_URL}/list?userId=${userId}`);
export const deleteItem = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const updateItem = (id, data) => axios.put(`${API_URL}/update/${id}`, data);
export const getSuggestions = (userId) => axios.get(`${API_URL}/suggestions?userId=${userId}`);
export const searchItems = (params) => {
    return axios.get(`${API_URL}/search`, { params });
};

