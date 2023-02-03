import axios from 'axios';

const PORT = process.env.POSTGRES_PORT || 5000;
const HOST = process.env.POSTGRES_HOST || 'localhost';

export const getBaseUrl = () => {
    return`${HOST}:${PORT}`;
}

export const instance = axios.create({
    baseURL: `${HOST}:${PORT}`
});

export { FilesApi } from './FilesApi';
export { CommentApi } from './CommentApi';
