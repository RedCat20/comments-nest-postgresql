import { instance } from "./index";

export const FilesApi = {

    async addFile(dto: FormData) {
        const { data } = await instance.post(`/files/files`, dto);
        return data;
    },

    async getFile(filename: string | any) {
        const { data } = await instance.get(`/upload/${filename}`, filename);
        return data;
    },

}