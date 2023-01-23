import { FC, useEffect } from 'react';
import { Paper } from "@mui/material";
import styles from "./CommentPreview.module.scss";
import CommentItem from "../CommentsBlock/CommentItem/CommentItem";

interface Props {
    data: any;
    file: any;
    previewTmp: string;
    extension: string;
}

const CommentPreview:FC<Props> = ({ data,file, previewTmp,extension }) => {

    useEffect(() => {
        /// => url without extension, such as for blob
        console.log('previewTmp: ', previewTmp);
        console.log('extension: ', extension);
    },[previewTmp, extension]);

    return (
        <Paper className={styles.previewWindow}>

            <CommentItem comment={data} fileView={previewTmp} lastFile={file} extension={extension} isPreviewOnly/>

            <div className={styles.table}>
                <div className={styles.block}>
                    <div>User name:</div> <div>{data.userName}</div>
                </div>
                <div className={styles.block}>
                    <div>Email:</div> <div>{data.email}</div>
                </div>
                <div className={styles.block}>
                    <div>Homepage:</div> <div>{data.homePage}</div>
                </div>
                <div className={styles.block}>
                    <div>Comment text:</div> <div dangerouslySetInnerHTML={{__html: data.text }}></div>
                </div>
            </div>
        </Paper>
    )
};

export default CommentPreview;