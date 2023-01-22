import { FC } from 'react';
import { Paper, Typography } from "@mui/material";
import styles from "./CommentPreview.module.scss";
import CommentItem from "../CommentsBlock/CommentItem/Comment";

interface Props {
    title?: string;
    comment: any;
    previewTmp: any;
}

const CommentPreview:FC<Props> = ({ title, comment, previewTmp  }) => {


    return (
        <Paper className={styles.previewWindow}>

            <CommentItem comment={comment} fileView={previewTmp} isPreviewOnly/>

            <div className={styles.table}>
                <div className={styles.block}>
                    <div>User name:</div> <div>{comment.userName}</div>
                </div>
                <div className={styles.block}>
                    <div>Email:</div> <div>{comment.email}</div>
                </div>
                <div className={styles.block}>
                    <div>Homepage:</div> <div>{comment.homePage}</div>
                </div>
                <div className={styles.block}>
                    <div>Comment text:</div> <div dangerouslySetInnerHTML={{__html: comment.text }}></div>
                </div>
            </div>
        </Paper>
    )
};

export default CommentPreview;