import * as React from "react";
import {FC, MouseEvent, ReactNode, useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, Typography} from "@mui/material";
import styles from './Comment.module.scss';
import DialogAlert from "../DialogAlert/DialogAlert";
import Form from "../Form/Form";
import {ConvertedCommentDto, CreateCommentDto} from "../../types/comment.types";
import {CommentApi, FilesApi} from "../../axios";
import Preview from "../Preview/Preview";

interface Props {
    comment: ConvertedCommentDto;
    setComments: () => void;
    renderComments: any;
    children?: ReactNode;
}

const Comment:FC<Props> = ({comment,setComments, children = null}) => {

    ///////

    const [file, setFile] = useState(null);
    //console.log('comment: ', comment)

    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onRemoveFileHandler = (e: MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
        setPreviewUrl('');
        setFile(null);
        if (fileInputRef?.current?.value) {
            fileInputRef.current.value = '';
        }
    }

    const onShowPreviewHandler = (e: MouseEvent<HTMLImageElement>) => {
        setOpen(true);
    }

    const setFileToPreview = async () => {
        // setPreviewUrl(URL.createObjectURL(file));
        const url = `http://localhost:5000/upload/${comment?.file}`;
        setPreviewUrl(url);
        let blob = await fetch(url).then(r => r.blob());
        // console.log('blob: ', blob)
        // @ts-ignore
        setFile(blob);
    }

    useEffect(() => {
        if (comment.file) {
            setFileToPreview();
        }
    }, [comment?.file]);

    ///////

    let creatDate;

    if (comment.createdAt) {
        creatDate = new Date( new Date(comment.createdAt).valueOf() ).toLocaleDateString();
        creatDate += ' | ';
        creatDate += new Date(  new Date(comment.createdAt).valueOf() ).toLocaleTimeString();
    }

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
        getFileFromStore();
    },[]);

    const getFileFromStore = async () => {
        if (comment.file && comment.file?.length > 0) {
            try {
                const file = await FilesApi.getFile(comment.file);
                //console.log('file', file);
                setFile(file);
            }
            catch(err) {
                //console.log('no file', err)
                setFile(null);
            }
        }
    }

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
                            {/*id: {comment.id} -- {comment.userName} -- parent: {comment.parentId ?? 'null'}*/}
                            {comment.userName}
                        </Typography>
                        <Typography variant="body1">
                            <>{creatDate}</>
                        </Typography>
                    </div>
                </Box>

                <Box className={styles.text} sx={{display: 'flex', justifyContent: 'space-between', gap: '30px'}}>
                    <div>
                        <p style={{color: 'gray', borderBottom: '1px dotted gray', paddingBottom: '10px'}}>{comment.email}</p>
                        <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
                    </div>
                    <div style={{marginTop: '30px'}}>{file && <Preview
                                           isViewMode={true}
                                           file={file}
                                           preview={previewUrl}
                                           onShowPreviewHandler={onShowPreviewHandler}
                                           onRemoveFileHandler={onRemoveFileHandler}
                                           open={open}
                                           setOpen={setOpen}
                    />}</div>
                </Box>

                {/*<div>File: {comment?.file}</div>*/}
                {/*<div> { comment?.file && <img className={styles.filePreview} src={`http://localhost:5000/upload/${comment.file}`} alt={comment.file}/> }  </div>*/}



                <Box sx={{marginTop: '20px'}}>
                    <Button
                        sx={{width: '200px'}}
                        onClick={() => setOpenDialog(true)}
                        variant="outlined"
                        color="primary">
                        Create answer
                    </Button>
                </Box>

                {/*<Box>*/}
                {/*    {answers?.map((answer: any, idx: number) => {*/}
                {/*        return <div key={idx}>parent for: {answer} </div>*/}
                {/*    })}*/}
                {/*</Box>*/}
            </Box>

            {children}

            <DialogAlert open={openDialog} setOpen={setOpenDialog} >
                <Form title="Add an answer" parent={comment} specialCallback={() => setOpenDialog(false)} setComments={setComments}/>
            </DialogAlert>
        </>
    );
};

export default Comment;