import {instance} from "./index";

export const FilesApi = {

    async addFile(dto: FormData) {
        const {data} = await instance.post('http://localhost:5000/files/files', dto);
        return data;
    },

}