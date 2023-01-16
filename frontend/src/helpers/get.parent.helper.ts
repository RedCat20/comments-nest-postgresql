import {CommentApi} from "../axios";

export const getParentComment = async (parentId: any) => {
    try {
        const comment = await CommentApi.getOneComment(parentId.toString());
        console.log(comment);
    } catch(err) {
        console.log(err);
    }
}