import axios from 'axios';

const PORT = process.env.POSTGRES_HOST || 5000;
const HOST = process.env.POSTGRES_HOST || 'localhost';

export const instance = axios.create({
    baseURL: `http://${HOST}:${PORT}`
});

export { FilesApi } from './FilesApi';
export { CommentApi } from './CommentApi';
