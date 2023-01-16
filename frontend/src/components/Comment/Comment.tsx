import {FC, ReactNode, useEffect, useState} from "react";
import {Avatar, Box, Button, Typography} from "@mui/material";
import styles from './Comment.module.scss';
import DialogAlert from "../DialogAlert/DialogAlert";
import * as React from "react";
import Form from "../Form/Form";
import {ConvertedCommentDto, CreateCommentDto} from "../../types/comment.types";
import {CommentApi} from "../../axios";

interface Props {
    comment: ConvertedCommentDto;
    setComments: () => void;
    renderComments: any;
    children?: ReactNode;
}

const Comment:FC<Props> = ({comment,setComments, children = null}) => {

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
                <Box className={styles.top} style={{background: `${comment.parentId === null ? '#e4eefa' : '#f3f3f3'}`}}>
                    <div className={styles.info}>
                        <Avatar/>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            id: {comment.id} -- {comment.userName} -- parent: {comment.parentId ?? 'null'}
                        </Typography>
                        <Typography variant="body1">
                            <>{creatDate}</>
                        </Typography>
                    </div>
                </Box>

                <Box className={styles.text}>
                    <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
                </Box>

                <div>File: {comment.file}</div>

                <Box sx={{marginTop: '20px'}}>
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
                        return <div key={idx}>parent for: {answer} </div>
                    })}
                </Box>
            </Box>

            {children}

            <DialogAlert open={open} setOpen={setOpen} >
                <Form title="Add an answer" parent={comment} specialCallback={() => setOpen(false)} setComments={setComments}/>
            </DialogAlert>
        </>
    );
};

export default Comment;