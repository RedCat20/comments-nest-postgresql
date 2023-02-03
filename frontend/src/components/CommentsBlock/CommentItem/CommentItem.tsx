import * as React from "react";
import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import styles from './CommentItem.module.scss';
import DialogAlert from "../../DialogAlert/DialogAlert";
import AddForm from "../../AddForm/AddForm";
import { ConvertedCommentDto } from "../../../types/comment.types";
import { FilesApi } from "../../../axios";
import Preview from "../../FilePreview/FilePreview";

const createCommentStyle = (comment: any) => {
    return {
        marginLeft: `${20 * comment.level}px`,
        borderLeft: `${comment.level > 0 ? '2px solid silver' : 'none'}`,
        paddingLeft: `${comment.level > 0 ? '10px' : '0'}`,
    }
}

interface Props {
    comment: ConvertedCommentDto;
    children?: ReactNode;
    sendComment?: any;
    comments?: any;
    lastFile?: any;
    isPreviewOnly?: boolean;
    fileView?: any;
    extension?: any;
}

const CommentItem:FC<Props> = ({comment,
                               children = null,
                               sendComment,
                               comments,
                               isPreviewOnly= false,
                               fileView,
                               extension,
                               lastFile
                               }) => {

    const [file, setFile] = useState<any>(null);

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

    useEffect(() => {
        if (fileView) {
            setPreviewUrl(fileView);
            // setFile(comment.file);
            console.log(fileView, extension)
        }
    },[fileView, extension]);

    const onShowPreviewHandler = (e: MouseEvent<HTMLImageElement>) => {
        setOpen(true);
    }

    const setFileToPreview = async () => {
        const url = `${process.env.BACKEND_HOST || 'http://localhost'}:${process.env.BACKEND_PORT || '5000'}/upload/${comment?.file}`;
        setPreviewUrl(url);
        let blob = await fetch(url).then(r => r.blob());
        // @ts-ignore
        setFile(blob);
    }

    useEffect(() => {
        if (comment?.file && !fileView) {
            setFileToPreview();
        }
    }, [comment]);

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
                 style={createCommentStyle(comment)}>
                <Box className={styles.top} style={{background: `${comment.parentId === null ? '#e4eefa' : '#f3f3f3'}`}}>
                    <div className={styles.info}>
                        <Avatar/>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            {comment.userName || 'Anonym'}
                        </Typography>
                        <Typography variant="body1">
                            <>{creatDate}</>
                        </Typography>
                    </div>
                </Box>

                <Box className={styles.text} sx={{display: 'flex', justifyContent: 'space-between', gap: '30px'}}>

                    <div>
                        <div className={styles.info}>
                            <p className={styles.contact}>Email: {comment.email}</p>
                            {comment.homePage &&
                              <p className={styles.contact}>Site: {comment.homePage}</p>
                            }
                        </div>
                        <p dangerouslySetInnerHTML={{__html: comment.text}}></p>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        {previewUrl && <Preview isViewMode={true}
                                           file={lastFile || file}
                                           preview={previewUrl}
                                           extension={extension}
                                           onShowPreviewHandler={onShowPreviewHandler}
                                           onRemoveFileHandler={onRemoveFileHandler}
                                           open={open}
                                           setOpen={setOpen}
                        />}
                    </div>
                </Box>

                {!isPreviewOnly && <Box sx={{marginTop: '20px'}}>
                    <Button
                        sx={{width: '200px'}}
                        onClick={() => setOpenDialog(true)}
                        variant="outlined"
                        color="primary">
                        Create answer
                    </Button>
                </Box>
                }
            </Box>

            {children}

            <DialogAlert open={openDialog} setOpen={setOpenDialog} >
                <AddForm
                    comments={comments}
                    sendComment={sendComment}
                    title="Add an answer"
                    parent={comment}
                    specialCallback={() => setOpenDialog(false)}
                />
            </DialogAlert>
        </>
    );
};

export default CommentItem;