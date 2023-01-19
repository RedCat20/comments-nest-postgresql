import * as React from "react";
import {FC, MouseEvent, ReactNode, useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, Typography} from "@mui/material";
import styles from './CommentItem.module.scss';
import DialogAlert from "../../DialogAlert/DialogAlert";
import AddForm from "../../AddForm/AddForm";
import { ConvertedCommentDto } from "../../../types/comment.types";
import { FilesApi } from "../../../axios";
import Preview from "../../Preview/Preview";

interface Props {
    comment: ConvertedCommentDto;
    renderComments: any;
    children?: ReactNode;
    sendComment?: any;
    comments?: any;
}

const CommentItem:FC<Props> = ({comment,
                                   children = null,
                                   sendComment,
                                   comments}) => {

    const [file, setFile] = useState(null);

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
        const url = `http://localhost:5000/upload/${comment?.file}`;
        setPreviewUrl(url);
        let blob = await fetch(url).then(r => r.blob());
        // @ts-ignore
        setFile(blob);
    }

    useEffect(() => {
        if (comment.file) {
            setFileToPreview();
        }
    }, [comment?.file]);

    let creatDate;

    if (comment.createdAt) {
        creatDate = new Date( new Date(comment.createdAt).valueOf() ).toLocaleDateString();
        creatDate += ' | ';
        creatDate += new Date(  new Date(comment.createdAt).valueOf() ).toLocaleTimeString();
    }

    useEffect(() => {
        getFileFromStore();
    },[]);

    const getFileFromStore = async () => {
        if (comment.file && comment.file?.length > 0) {
            try {
                const file = await FilesApi.getFile(comment.file);
                setFile(file);
            }
            catch(err) {
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

                <Box sx={{marginTop: '20px'}}>
                    <Button
                        sx={{width: '200px'}}
                        onClick={() => setOpenDialog(true)}
                        variant="outlined"
                        color="primary">
                        Create answer
                    </Button>
                </Box>
            </Box>

            {children}

            <DialogAlert open={openDialog} setOpen={setOpenDialog} >
                <AddForm comments={comments} sendComment={sendComment} title="Add an answer" parent={comment} specialCallback={() => setOpenDialog(false)}/>
            </DialogAlert>
        </>
    );
};

export default CommentItem;