import { CreateCommentDto } from "../types/comment.types";
import { getBaseUrl, instance } from "./index";

export const CommentApi = {

    async getMainComments(currentPage: number | string, sort: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`${baseUrl}/comments/?page=${currentPage || 1}&sort=${sort}`);
        return data;
    },

    async addComment(dto: CreateCommentDto) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.post(`${baseUrl}/comments`, dto);
        return data;
    },

    async getOneComment(id: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`${baseUrl}/comments/${id}`);
        return data;
    },

    async getCommentAnswers(id: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`${baseUrl}/comments/${id}/answers`);
        return data;
    },

    async getAllComments(currentPage: number | string, sort: string) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`${baseUrl}/comments/all?page=${currentPage || 1}&sort=${sort}`);
        return data;
    },

    async updateComment(dto: CreateCommentDto, id: number) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.patch(`${baseUrl}/comments/${id}`, dto);
        return data;
    }
};