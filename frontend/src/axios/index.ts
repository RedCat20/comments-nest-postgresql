import axios from 'axios';

const PORT = 10000 || 5000;
const HOST = 'https://comments-nest-postgresql.onrender.com' || 'http://localhost';

export const getBaseUrl = () => {
    console.log('PORT: ', PORT)
    console.log('HOST: ', HOST)
    // return`${HOST}:${PORT}`;
    return`${HOST}`;
}

export const instance = axios.create({
   baseURL: getBaseUrl()
});

export { FilesApi } from './FilesApi';
export { CommentApi } from './CommentApi';
