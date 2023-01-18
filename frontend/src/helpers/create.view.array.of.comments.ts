import {CreateCommentDtoWithId} from "../types/comment.types";

export const createArrayOfMainComments = (comments: CreateCommentDtoWithId[]) => {

    const filteredComments = comments.filter(item => item.parentId === null);
    console.log('filteredComments: ', filteredComments);

    return filteredComments;
}

export const createViewArrayOfComments = (comments: CreateCommentDtoWithId[]) => {
    //const mainNodes: ConvertedCommentDto[] = comments.filter(item => item.parentId === null);
    const mainNodes: any = comments.filter(item => item.parentId === null);

    const mainNodesCopy = JSON.parse(JSON.stringify(mainNodes.reverse()));

    let newArr: any = [];

    mainNodesCopy.forEach((item: any, idx: number, arr: any) => {
        if (item.answers?.length > 0) {
            item.answers = item.answers.map((ans: any) => comments.filter(comm => comm.id === ans)[0]);
        }
        newArr.push(item);
    });
    console.log('newArr: ', newArr);

    return newArr;
}
