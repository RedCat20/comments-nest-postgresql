import {instance} from "./index";

export const FilesApi = {

    async addFile(dto: FormData) {
        const {data} = await instance.post(`${process.env.BACKEND_HOST || 'http://localhost'}:${process.env.BACKEND_PORT || '5000'}/files/files`, dto);
        return data;
    },

    async getFile(filename: string | any) {
        const {data} = await instance.get(`${process.env.BACKEND_HOST || 'http://localhost'}:${process.env.BACKEND_PORT || '5000'}/upload/${filename}`, filename);
        return data;
    },

}