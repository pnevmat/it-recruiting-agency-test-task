import axios from 'axios';
import BASE_URL from '../utils/baseUrl';

axios.defaults.baseURL = BASE_URL;

export const getAlbumsQuery = async () => {
	try {
		const response = await axios.get('/photos').then(({data}) => data);
		return response;
	} catch (error) {
		return error;
	};
};
