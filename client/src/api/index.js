import axios from 'axios';
// const BaseUrl = "http://localhost:5002/api/"
const BaseUrl = "/api/"
axios.defaults.baseURL = BaseUrl;
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return error?.response?.data
});
export default {
    get: async (endpoint, params = {}) => {
        return axios.get(endpoint, { params });
    },
    post: async (endpoint, body, params = {}) => {
        return axios.post(endpoint, body, { params });
    },
    put: async (endpoint, body, params = {}) => {
        return axios.put(endpoint, body, { params });
    },
    patch: async (endpoint, body, params = {}) => {
        return axios.patch(endpoint, body, { params });
    },
    delete: async (endpoint, params) => {
        return axios.delete(endpoint, { params });
    },
};
