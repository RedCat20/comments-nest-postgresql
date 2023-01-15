import {FC, MouseEvent} from "react";
import {Box, Button, Typography} from "@mui/material";
import styles from "./Top.module.scss";

interface Props {
    onAddCommentCallback: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Top:FC<Props> = ({onAddCommentCallback}) => {
    return (
        <Box className={styles.top}>
            <Typography align="center" variant="h5">
                Comments
            </Typography>
            <Button
                onClick={onAddCommentCallback}
                variant="contained"
                color="primary">
                Create a comment
            </Button>
        </Box>
    );
};

export default Top;