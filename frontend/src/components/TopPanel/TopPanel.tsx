import { FC, MouseEvent, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./TopPanel.module.scss";
import AddForm from "../AddForm/AddForm";
import DialogAlert from "../DialogAlert/DialogAlert";

interface Props {
    sendComment: any;
    comments: any;
}

const TopPanel:FC<Props> = ({ sendComment,comments }) => {

    const [open, setOpen] = useState(false);

    const onAddCommentHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
    }

    return (
        <>
            <Box className={styles.top}>

                <Typography align="center" variant="h5">
                    Comments
                </Typography>

                <Button
                    onClick={onAddCommentHandler}
                    variant="contained"
                    color="primary">
                    Create a comment
                </Button>

            </Box>

            <DialogAlert open={open} setOpen={setOpen}>

                <AddForm
                    comments={comments}
                    sendComment={sendComment}
                    title="Add a comment"
                    parent={null}
                    specialCallback={ () => setOpen(false) }
                />

            </DialogAlert>
        </>
    );
};

export default TopPanel;