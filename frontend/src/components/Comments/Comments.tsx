import {FC, useEffect, useState, MouseEvent} from "react";
import Comment from '../Comment/Comment';
import {CreateCommentDto, CreateCommentDtoWithId} from "../../data/types";

import styles from './Comments.module.scss';

interface Props {
    comments: CreateCommentDtoWithId[];
    setComments: (value: CreateCommentDtoWithId[]) => void;
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

    return (
        <>
            {comments && Array.isArray(comments) && comments.map((comment: CreateCommentDtoWithId) => {
                return <Comment key={comment.id} comment={comment} comments={comments} setComments={setComments}/>
            })}

            <div className={styles.pages}>
                {new Array(pages).fill(undefined).map((item, idx) => {
                    return <button key={idx} onClick={(e: MouseEvent<HTMLButtonElement>) => onClickPageHandler(idx + 1)} className={styles.page}>{idx + 1}</button>
                })}
            </div>
        </>
    );
};

export default Comments;