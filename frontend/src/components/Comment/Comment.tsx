import {FC, useEffect, useState} from "react";
import {Avatar, Box, Button, Typography} from "@mui/material";
import styles from './Comment.module.scss';
import DialogAlert from "../DialogAlert/DialogAlert";
import * as React from "react";
import Form from "../Form/Form";
import {CreateCommentDto, CreateCommentDtoWithId} from "../../data/types";
import {CommentApi} from "../../data/axiosInstance";

interface Props {
    comment: CreateCommentDtoWithId;
    comments: CreateCommentDtoWithId[];
    setComments: (value: CreateCommentDtoWithId[]) => void;
}

const Comment:FC<Props> = ({comment,setComments,comments = []}) => {

    //console.log('comment: ', comment)

    let creatDate;

    if (comment.createdAt) {
        creatDate = new Date( new Date(comment.createdAt).valueOf() ).toLocaleDateString();
        creatDate += ' | ';
        creatDate += new Date(  new Date(comment.createdAt).valueOf() ).toLocaleTimeString();
    }

    const [open, setOpen] = useState(false);

    const [answers, setAnswers] = useState<number[]>();

    const getAnswers = async () => {
        try {
            if (comment.id) {
                const commentObj: CreateCommentDto = await CommentApi.getOneComment(comment.id.toString());
                const answers = commentObj?.answers;
                if (answers?.length) {
                    setAnswers(commentObj.answers)
                }
            }
        } catch(err) {
            console.log(err);
        } finally {  }
    }

    useEffect(() => {
        getAnswers();
    },[]);

    return (
        <>
            <Box className={styles.comment}
                 style={{
                     marginLeft: `${20 * comment.level}px`,
                     borderLeft: `${comment.level > 0 ? '2px solid silver' : 'none'}`,
                     paddingLeft: `${comment.level > 0 ? '10px' : '0'}`,
                }}>
                <Box className={styles.top}  style={{background: `${comment.parentId === null ? 'bisque' : '#f3f3f3'}`}}>
                    <div className={styles.info}>
                        <Avatar/>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            id: {comment.id} -- {comment.userName} -- parent: {comment.parentId ?? 'no parent'}
                        </Typography>
                        <Typography variant="body1">
                            <>{creatDate}</>
                        </Typography>
                    </div>
                </Box>

                <Box className={styles.text}>
                    <p>{comment.text}</p>
                </Box>

                <Box>
                    <Button
                        sx={{width: '200px'}}
                        onClick={() => setOpen(true)}
                        variant="text"
                        color="primary">
                        Create answer
                    </Button>
                </Box>

                <Box>
                    {answers?.map((answer: any, idx: number) => {
                        return <div key={idx}>{answer} parent: {comment.parentId}</div>
                    })}

                    {/*{comment?.answers?.map((answer,idx) => {*/}
                    {/*    return <div key={idx}>{answer}</div>*/}
                    {/*})}*/}
                </Box>
            </Box>

            <DialogAlert open={open} setOpen={setOpen} >
                <Form title="Add an answer" parent={comment} comments={comments} specialCallback={() => setOpen(false)} setComments={setComments}/>
            </DialogAlert>
        </>
    );
};

export default Comment;