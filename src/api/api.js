import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const getAll = () => {
    return axios.get(`${BASE_URL}/get-all-data`);
};

const getDetail = (id, version) => {
    return axios.get(`${BASE_URL}/detail/${id}/${version}`);
};

export { getDetail, getAll };
