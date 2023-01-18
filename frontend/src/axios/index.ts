import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

export { FilesApi } from './FilesApi';
export { CommentApi } from './CommentApi';
