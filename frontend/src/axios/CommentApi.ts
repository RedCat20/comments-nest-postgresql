import { CreateCommentDto } from "../types/comment.types";
import { getBaseUrl, instance } from "./index";

export const CommentApi = {

    async getMainComments(currentPage: number | string, sort: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`/comments/?page=${currentPage || 1}&sort=${sort}`);
        return data;
    },

    async addComment(dto: CreateCommentDto) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.post(`/comments`, dto);
        return data;
    },

    async getOneComment(id: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`/comments/${id}`);
        return data;
    },

    async getCommentAnswers(id: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`/comments/${id}/answers`);
        return data;
    },

    async getAllComments(currentPage: number | string, sort: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`/comments/all?page=${currentPage || 1}&sort=${sort}`);
        return data;
    },

    async updateComment(dto: CreateCommentDto, id: number) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.patch(`/comments/${id}`, dto);
        return data;
    }
};