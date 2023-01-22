import {FC, useEffect, useState, MouseEvent} from "react";
import Comment from '../CommentItem/Comment';
import {ConvertedCommentDto, CreateCommentDtoWithId} from "../../../types/comment.types";

import styles from './AllComments.module.scss';
import {Button} from "@mui/material";

interface Props {
    comments: CreateCommentDtoWithId[];
    count: number;
    isMainOnly: boolean;
    setCurrentPage: (value: number) => void;
    currentPage: number;
    sendComment: any;
}

const AllComments:FC<Props> = ({   comments,
                                   count,
                                   isMainOnly,
                                   setCurrentPage,
                                   currentPage,
                                   sendComment}) => {
    const [pages, setPages] = useState(0);

    useEffect(() => {
        setPages(Math.ceil(count / 25));
    }, [count]);

    const onClickPageHandler = (page: number) => {
        setCurrentPage(page);
    }

    const onChangePageHandler = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
        onClickPageHandler(idx + 1);
    }

    const renderComments = (commentsCopy: any = comments) => {
        console.log(commentsCopy)
        // if (commentsCopy) {
        //     return (
        //         <>
        //             {commentsCopy.map((item: ConvertedCommentDto, idx: number) => {
        //                 if (isMainOnly || item.answers?.length === 0) {
        //                     return <Comment key={`comment_${idx}`} comment={item} comments={comments}
        //                                     renderComments={this} sendComment={sendComment}/>
        //                 } else if (!isMainOnly) {
        //                     return (
        //                         <Comment key={item.id} comment={item} renderComments={this}>
        //                             {item.answers?.length > 0 &&
        //                               <> {item.answers.map((ans: any, idx: number) => {
        //                                   return (
        //                                       <Comment key={`${ans.id}_${idx}`} comment={ans} comments={comments}
        //                                                renderComments={this} sendComment={sendComment}>
        //
        //                                           {ans.answers?.length > 0 &&
        //                                             <> {ans.answers.map((answer: any, idx: number) => {
        //                                                 return (
        //                                                     <Comment key={`${answer.id}_${idx}`} comment={answer} comments={comments}
        //                                                              renderComments={this} sendComment={sendComment}>
        //                                                     </Comment>
        //                                                 )
        //                                             })
        //                                             }
        //                                             </>
        //                                           }
        //
        //                                       </Comment>
        //                                   )
        //                               })
        //                               }
        //                               </>
        //                             }
        //                         </Comment>)
        //                 }
        //             })
        //             }
        //         </>
        //     )
        // }
        // else {
        //    return null
        // }
    }

    return (
        <>
            {comments?.length === 0 &&
              <div className={styles.noComments}>No comments, please add smth</div>
            }

            {/*{renderComments()}*/}

            <div className={styles.pages}>
                {new Array(pages).fill(undefined).map((item, idx) => {
                    return <Button key={idx}
                                   variant="contained"
                                   color={(currentPage - 1 === idx) ? 'warning' : 'secondary'}
                                   onClick={(e: MouseEvent<HTMLButtonElement>) => onChangePageHandler(e, idx)}
                    >
                        {idx + 1}
                    </Button>
                })}
            </div>
        </>
    );
};

export default AllComments;