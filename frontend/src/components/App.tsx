import {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import styles from './App.module.scss';
import {Container, ThemeProvider} from "@mui/material";
import {theme} from "../assets/theme";
import TopPanel from "./TopPanel/TopPanel";
import Form from "./Form/Form";
import Comments from "./Comments/Comments";
import {CreateCommentDtoWithId} from "../types/comment.types";
import {CommentApi} from "../axios";
import DialogAlert from "./DialogAlert/DialogAlert";
import * as React from "react";
import {createArrayOfMainComments, createViewArrayOfComments} from "../helpers/create.view.array.of.comments";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const App:FC = () => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CreateCommentDtoWithId[]>([]);
    const [count, setCount] = useState<number>(0);
    const [radioValue, setRadioValue] = useState('all')
    const [currentPage, setCurrentPage] = useState<number>(1);

    const setAllComments = async () => {
        const comments = await CommentApi.getAllComments(currentPage);
        setComments(comments.rows);
        setCount(comments.count);
    }

    const getComments = async () => {
        //const comments = await CommentApi.getAllComments(currentPage);
        const comments = await CommentApi.getAllComments(currentPage);
        setComments(createViewArrayOfComments(comments.rows));
        setCount(comments.count);
    }
    useEffect(() => {
        getComments();
    },[currentPage]);

    const onAddCommentHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setOpen(true)
    }

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
        if (e.target.value === 'main') {
            const mainComments = createArrayOfMainComments(comments);
            setComments(mainComments);
        } else {
            getComments();
        }
    }

    return (
      <ThemeProvider  theme={theme}>

          <Container sx={{background: '#cccccc', minHeight: '100vh', padding: '24px'}}>

            <div className={styles.content}>
               <TopPanel onAddCommentCallback={onAddCommentHandler}/>

                <div className={styles.switcher}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Type of comments</FormLabel>
                        <RadioGroup
                            aria-labelledby="comment-radio-buttons-group-label"
                            defaultValue="all"
                            name="radio-buttons-group"
                            value={radioValue}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All comments" />
                            <FormControlLabel value="main" control={<Radio />} label="Main comments with sorting" />
                        </RadioGroup>
                    </FormControl>
                </div>

                <Comments isMainOnly={radioValue === 'main'} comments={comments} count={count} setComments={setAllComments} setCurrentPage={setCurrentPage}/>
            </div>

          </Container>

          <DialogAlert open={open} setOpen={setOpen} >
              <Form title="Add a comment" setComments={setAllComments} parent={null} specialCallback={() => setOpen(false)}/>
          </DialogAlert>

      </ThemeProvider>
    );
}

export default App;
