import {FC, MouseEvent, useEffect, useState} from 'react';
import styles from './App.module.scss';
import {Container, ThemeProvider} from "@mui/material";
import {theme} from "../assets/theme";
import TopPanel from "./TopPanel/TopPanel";
import Form from "./Form/Form";
import Comments from "./Comments/Comments";
import {CreateCommentDtoWithId} from "../types/comment.types";
import {CommentApi} from "../axios/CommentApi";
import DialogAlert from "./DialogAlert/DialogAlert";
import * as React from "react";
import {createViewArrayOfComments} from "../helpers/create.view.array.of.comments";

const App:FC = () => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CreateCommentDtoWithId[]>([]);
    const [count, setCount] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const setAllComments = async () => {
        const comments = await CommentApi.getAllComments(currentPage);
        setComments(comments.rows);
        setCount(comments.count);
    }

    const getComments = async () => {
        const comments = await CommentApi.getAllComments(currentPage);
        setComments(comments.rows);
        setCount(comments.count);
    }
    useEffect(() => {
        getComments();
    },[currentPage]);

    useEffect(() => {
        createViewArrayOfComments([...comments]);
    }, [comments]);

    const onAddCommentHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
    }

    return (
      <ThemeProvider  theme={theme}>

          <Container sx={{background: '#cccccc', minHeight: '100vh', padding: '24px'}}>

            <div className={styles.content}>
               <TopPanel onAddCommentCallback={onAddCommentHandler}/>

                <Comments comments={comments} count={count} setComments={setAllComments} setCurrentPage={setCurrentPage}/>
            </div>

          </Container>

          <DialogAlert open={open} setOpen={setOpen} >
              <Form title="Add a comment" setComments={setAllComments} parent={null} specialCallback={() => setOpen(false)}/>
          </DialogAlert>

      </ThemeProvider>
    );
}

export default App;
