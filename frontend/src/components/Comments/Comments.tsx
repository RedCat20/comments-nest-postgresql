import {FC, useEffect, useState, MouseEvent} from "react";
import Comment from '../Comment/Comment';
import {ConvertedCommentDto, CreateCommentDto, CreateCommentDtoWithId} from "../../data/types";

import styles from './Comments.module.scss';
import {createViewArrayOfComments} from "../../helpers/create.view.array.of.comments";
import {Button} from "@mui/material";

interface Props {
    comments: CreateCommentDtoWithId[];
    // setComments: (value: CreateCommentDtoWithId[]) => void;
    setComments: () => void;
    count: number;
    setCurrentPage: (value: number) => void;
}

const Comments:FC<Props> = ({comments,setComments,count,setCurrentPage}) => {
    console.log('comments: ', comments);

    const [pages, setPages] = useState(0);

    useEffect(() => {
        setPages(Math.ceil(count / 25));
    }, [count]);

    const onClickPageHandler = (page: number) => {
        setCurrentPage(page);
    }

    const renderComments = (commentsCopy: any = comments) => {
        console.log('comments: ', comments)
       //const array = createViewArrayOfComments(commentsCopy).reverse();
       const array = createViewArrayOfComments(commentsCopy);

       return (
           <>{array.map((item: ConvertedCommentDto) => {
               if (item.answers?.length === 0) {
                   return <Comment key={item.id} comment={item} comments={comments} setComments={setComments} renderComments={this}/>
               } else {
                   return ( <Comment key={item.id} comment={item} comments={comments} setComments={setComments} renderComments={this}>
                       {item.answers.map((ans: any) => {
                           return <Comment key={ans.id} comment={ans} comments={comments} setComments={setComments} renderComments={this}/>;
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

            {/*{comments && Array.isArray(comments) && comments.map((comment: CreateCommentDtoWithId) => {*/}
            {/*    return <Comment key={comment.id} comment={comment} comments={comments} setComments={setComments}/>*/}
            {/*})}*/}

            <div className={styles.pages}>
                {new Array(pages).fill(undefined).map((item, idx) => {
                    return <Button variant="contained" color="secondary" key={idx} onClick={(e: MouseEvent<HTMLButtonElement>) => onClickPageHandler(idx + 1)}>{idx + 1}</Button>
                })}
            </div>
        </>
    );
};

export default Comments;