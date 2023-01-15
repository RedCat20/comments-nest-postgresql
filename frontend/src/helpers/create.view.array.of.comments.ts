import {CreateCommentDtoWithId} from "../data/types";

export const createViewArrayOfComments = (comments: CreateCommentDtoWithId[]) => {

    const mainNodes = comments.filter(item => item.parentId === null);

    // console.log('mainNodes: ', mainNodes);

    if (!mainNodes.length) return;

    let newArray = [];

    for (let j = 0; j < mainNodes.length; j++) {
        let node = mainNodes[j];
        console.log('node: ', node);
        if (!node.answers || node.answers?.length === 0) {
            newArray.push(node);
            return;
        }
        //for (let i = 0; i < node.answers.length; i++) {
            let ans = [...node.answers];
            node.answers = [];
            // @ts-ignore
            node.answers = ans.map(answer => comments.find(comment => answer === comment.id));
        //}
        newArray.push(node);

        // if (!node.answers || node.answers?.length === 0) {
        //    // newArray.push(node);
        // } else if (node.answers?.length > 0) {
        //     // let arr: (string | number)[] = [];
        //     // for (let item in node.answers) {
        //     //     if (item !== 'length') {
        //     //         arr.push(item)
        //     //     }
        //     // }
        //
        //     // @ts-ignore
        //
        //     // node.answers = comments.filter(comment => {
        //     //     // @ts-ignore
        //     //         //console.log(comment, node.answers.indexOf(comment.id) !== -1)
        //     //         console.log(comment.id)
        //     //     // @ts-ignore
        //     //         return arr.indexOf(comment.id) !== -1;
        //     // }
        //     // );
        //     // newArray.push(node);
        // }
        // else {
        //     // @ts-ignore
        //     for (let i = 0; i < node.answers.length; i++) {
        //         newArray.push(node);
        //         // @ts-ignore
        //         node.answers = comments.filter(item => node?.answers[i] === item.id);
        //     }
        // }
    }

    console.log('newArray: ', newArray);

    //let result = compare(mainNodes, comments, newArray);
    //console.log('result', result);

    return [];

}

// const compare = (mainNodes: CreateCommentDtoWithId[], comments: CreateCommentDtoWithId[], newArray: CreateCommentDtoWithId[]) => {
//     for (let j = 0; j < mainNodes.length; j++) {
//         newArray[j] = mainNodes[j];
//         newArray[j].answers = [];
//         for (let i = 0; i < comments.length; i++) {
//             if (mainNodes[j].id === comments[i].parentId) {
//                 // @ts-ignore
//                 newArray[j].answers.push(comments[i]);
//                 // @ts-ignore
//                 if (comments[i].answers?.length > 0) {
//                     compare(mainNodes, comments, newArray);
//                 } else {
//                     break ;
//                 }
//             }
//         }
//     }
//     return newArray;
// }