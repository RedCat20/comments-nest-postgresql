import {instance} from "./index";

export const FilesApi = {

    async addFile(dto: FormData) {
        const {data} = await instance.post(`${process.env.POSTGRES_BACKEND_HOST || 'http://localhost'}:${process.env.POSTGRES_BACKEND_PORT || '5000'}/files/files`, dto);
        return data;
    },

    async getFile(filename: string) {
        // console.log('filename: ', filename)
        // @ts-ignore
        const {data} = await instance.get(`${process.env.POSTGRES_BACKEND_HOST || 'http://localhost'}:${process.env.POSTGRES_BACKEND_PORT || '5000'}/upload/${filename}`, filename);
        return data;
    },

}