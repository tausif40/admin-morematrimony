import axios from 'axios';
import Cookies from 'js-cookie';
import.meta.env.VITE_APP_BASE_URL

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const getToken = () => Cookies.get('access_token');

console.log(BASE_URL);

const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
	},
});
// 'Content-Type': 'multipart/form-data',

apiClient.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default apiClient;