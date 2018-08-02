import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

axios.defaults.baseURL = BASE_URL;
if (window.sessionStorage.token !== "" && window.sessionStorage.token !== undefined) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + window.sessionStorage.token;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default ({
    get: function (url) {
        var baseURL = BASE_URL + url;
        return axios.get(baseURL).then(function (response) {
            return response;
        }).catch(function (error) {
            return error;
        });
    },
    post: function (url, data) {
        var baseURL = BASE_URL + url;
        return axios.post(baseURL, data).then(function (response) {
            return response;
        }).catch(function (error) {
            return error;
        });
    },
    put: function (url, data) {
        var baseURL = BASE_URL + url;
        return axios.post(baseURL, data).then(function (response) {
            return response;
        }).catch(function (error) {
            return error;
        });
    },
});