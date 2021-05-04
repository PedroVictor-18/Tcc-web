import axios from 'axios';
import env from '../env';

const api = axios.create({
	baseURL: env.USE_TEST_API ? env.API_TEST_URL : env.API_URL,
});

api.interceptors.request.use(async config => {
	const token = localStorage.getItem('@token');
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default api;