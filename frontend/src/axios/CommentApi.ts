import {CreateCommentDto} from "../types/comment.types";
import {instance} from "./index";

export const CommentApi = {

    async getAllComments(currentPage: number) {
        const {data} = await instance.get(`http://localhost:5000/comments?page=${currentPage || 1}`);
        return data;
    },

    async addComment(dto: CreateCommentDto) {
        const {data} = await instance.post('http://localhost:5000/comments', dto);
        return data;
    },

    async updateComment(dto: CreateCommentDto, id: number) {
        const {data} = await instance.patch(`http://localhost:5000/comments/${id}`, dto);
        return data;
    },

    async getOneComment(id: string) {
        const {data} = await instance.get(`http://localhost:5000/comments/${id}`);
        return data;
    }

};