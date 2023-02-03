import { getBaseUrl, instance } from "./index";

export const FilesApi = {

    async addFile(dto: FormData) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.post(`${baseUrl}/files/files`, dto);
        return data;
    },

    async getFile(filename: string | any) {
        const baseUrl = getBaseUrl();
        const { data } = await instance.get(`${baseUrl}/upload/${filename}`, filename);
        return data;
    },

}