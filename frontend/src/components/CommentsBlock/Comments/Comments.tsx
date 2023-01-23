import { FC, useEffect, useState } from 'react';
import styles from "./Comments.module.scss";
import { ConvertedCommentDto } from "../../../types/comment.types";
import Comment from "../CommentItem/CommentItem";

interface Props {
    comments: any[];
    sendComment: (comment: any) => void;
}

const Comments:FC<Props> = ({comments,sendComment}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | any | null = null;

        if (comments) {
            setIsLoading(false);
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    },[comments]);

    const createAnswers = (answers: any) => {
        return (
            <>
                {answers.map((itemAnswer: any, idx2: number) => {
                    return (
                        <Comment key={`comment_${idx2}`} comment={itemAnswer} comments={comments}
                                 sendComment={sendComment}>
                            {itemAnswer?.answers?.length > 0 && createAnswers(itemAnswer.answers)}
                        </Comment>
                    )})
                }
            </>
        )
    }

    return (
        <>
            {isLoading &&
              <div className={styles.noComments}>Loading...</div>
            }

            {!isLoading && comments?.length === 0 &&
              <div className={styles.noComments}>No comments, please add smth</div>
            }

            {comments?.length > 0 && comments.map((item: ConvertedCommentDto, idx: number) => {
                    return (
                        <Comment key={`comment_${idx}`} comment={item} comments={comments}
                                    sendComment={sendComment}>
                            {item?.answers?.length > 0 && createAnswers(item.answers)}
                        </Comment>
                    )
                })
            }
        </>
    );
};

export default Comments;