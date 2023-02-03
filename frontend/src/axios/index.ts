import axios from 'axios';

const PORT = process.env.BACKEND_PORT || 5000;
const HOST = process.env.BACKEND_HOST || 'http://localhost';

export const getBaseUrl = () => {
    console.log('PORT: ', PORT)
    console.log('HOST: ', HOST)
    return`${HOST}:${PORT}`;
}

export const instance = axios.create({
   baseURL: getBaseUrl()
});

export { FilesApi } from './FilesApi';
export { CommentApi } from './CommentApi';
