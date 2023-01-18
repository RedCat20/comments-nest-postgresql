import {instance} from "./index";

export const FilesApi = {

    async addFile(dto: FormData) {
        const {data} = await instance.post('http://localhost:5000/files/files', dto);
        return data;
    },

    async getFile(filename: string) {
        // console.log('filename: ', filename)
        // @ts-ignore
        const {data} = await instance.get(`http://localhost:5000/upload/${filename}`, filename);
        return data;
    },

}