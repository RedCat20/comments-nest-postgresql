import {FC, useEffect, useState, MouseEvent} from "react";
import Comment from '../Comment/Comment';
import {ConvertedCommentDto, CreateCommentDto, CreateCommentDtoWithId} from "../../types/comment.types";

import styles from './Comments.module.scss';
import {createViewArrayOfComments} from "../../helpers/create.view.array.of.comments";
import {Button} from "@mui/material";

interface Props {
    comments: CreateCommentDtoWithId[];
    setComments: () => void;
    count: number;
    isMainOnly: boolean;
    setCurrentPage: (value: number) => void;
}

const Comments:FC<Props> = ({comments,setComments,count,isMainOnly,setCurrentPage}) => {
    const [pages, setPages] = useState(0);

    useEffect(() => {
        setPages(Math.ceil(count / 25));
    }, [count]);

    const onClickPageHandler = (page: number) => {
        setCurrentPage(page);
    }

    const renderComments = (commentsCopy: any = comments) => {
       return (
           <>{commentsCopy.map((item: ConvertedCommentDto) => {
               if (isMainOnly || item.answers?.length === 0) {
                   return <Comment key={item.id} comment={item} setComments={setComments} renderComments={this}/>
               } else if (!isMainOnly) {
                   return ( <Comment key={item.id} comment={item} setComments={setComments} renderComments={this}>
                       {item.answers.map((ans: any) => {
                           return <Comment key={ans.id} comment={ans} setComments={setComments} renderComments={this}/>;
                       })}
                   </Comment> )
               }
           } )}</>
       )
    }

    return (
        <>
            {comments?.length === 0 && <div className={styles.noComments}>No comments, please add smth</div>}
            {renderComments()}
            <div className={styles.pages}>
                {new Array(pages).fill(undefined).map((item, idx) => {
                    return <Button variant="contained" color="secondary" key={idx} onClick={(e: MouseEvent<HTMLButtonElement>) => onClickPageHandler(idx + 1)}>{idx + 1}</Button>
                })}
            </div>
        </>
    );
};

export default Comments;