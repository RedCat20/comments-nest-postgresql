import { CreateCommentDto } from "../types/comment.types";
import { instance } from "./index";

export const CommentApi = {

    async getMainComments(currentPage: number | string, sort: string) {
        const {data} = await instance.get(`http://localhost:5000/comments/?page=${currentPage || 1}&sort=${sort}`);
        return data;
    },

    async addComment(dto: CreateCommentDto) {
        const {data} = await instance.post('http://localhost:5000/comments', dto);
        return data;
    },

    async getOneComment(id: string) {
        const {data} = await instance.get(`http://localhost:5000/comments/${id}`);
        return data;
    },

    async getCommentAnswers(id: string) {
        const {data} = await instance.get(`http://localhost:5000/comments/${id}/answers`);
        return data;
    },

    async getAllComments(currentPage: number | string, sort: string) {
        const {data} = await instance.get(`http://localhost:5000/comments/all?page=${currentPage || 1}&sort=${sort}`);
        return data;
    },

    async updateComment(dto: CreateCommentDto, id: number) {
        const {data} = await instance.patch(`http://localhost:5000/comments/${id}`, dto);
        return data;
    }
};