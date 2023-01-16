import {useCallback, useEffect, useState} from "react";
import {CommentApi} from "../axios";

export const useGetParentComment = (parentId: number) => {
    const [comment, setComment] = useState<any[]>();

    const getParentComment = useCallback(async () => {
        try {
            const comment = await CommentApi.getOneComment(parentId.toString());
            // console.log(comment);
            setComment(comment);
        } catch(err) {
            console.log(err);
        }
    }, [parentId]);
    
    useEffect(() => {
        getParentComment().then(r => r);
    },[getParentComment, parentId]);

    return [comment];
    
}

// export const useGetParentComment = async (parentId: any) => {
//     try {
//         const comment = await CommentApi.getOneComment(parentId.toString());
//         console.log(comment);
//     } catch(err) {
//         console.log(err);
//     }
// }