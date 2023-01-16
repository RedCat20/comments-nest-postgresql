import axios from 'axios';
import {CreateCommentDto} from "./types";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

export const CommentApi = {

    async getAllComments(currentPage: number) {
        const {data} = await instance.get(`http://localhost:5000/comments?page=${currentPage || 1}`);
        console.log('data: ', data)
        return data;
    },

    async addComment(dto: CreateCommentDto) {
        console.log('dto: ', dto);
        const {data} = await instance.post('http://localhost:5000/comments', dto);
        return data;
    },

    async updateComment(dto: CreateCommentDto, id: number) {
        console.log('dto: ', dto);
        const {data} = await instance.patch(`http://localhost:5000/comments/${id}`, dto);
        return data;
    },

    async getOneComment(id: string) {
       // console.log('dto: ', id);
        const {data} = await instance.get(`http://localhost:5000/comments/${id}`);
        return data;
    }

};

export const FilesApi = {

    async addFile(dto: FormData) {
        console.log('dto: ', dto);
        const {data} = await instance.post('http://localhost:5000/files/files', dto);
        return data;
    },
}