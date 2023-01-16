import {ConvertedCommentDto, CreateCommentDtoWithId} from "../types/comment.types";

export const createViewArrayOfComments = (comments: CreateCommentDtoWithId[]) => {
    //const mainNodes: ConvertedCommentDto[] = comments.filter(item => item.parentId === null);
    const mainNodes: any = comments.filter(item => item.parentId === null);
    console.log('mainNodes: ', mainNodes);

    const mainNodesCopy = JSON.parse(JSON.stringify(mainNodes.reverse()));

    let newArr: any = [];

    mainNodesCopy.forEach((item: any, idx: number, arr: any) => {
        if (item.answers?.length > 0) {
            item.answers = item.answers.map((ans: any) => comments.filter(comm => comm.id === ans)[0]);
        }
        newArr.push(item);
    });

    console.log('New arr: ', newArr);

    return newArr;
}