import React, {ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import MainComments from "./MainComments/MainComments";
import Comments from "./AllComments/AllComments";
import styles from "../App.module.scss";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {CreateCommentDtoWithId} from "../../types/comment.types";
import {CommentApi} from "../../axios";
import {createArrayOfMainComments, createViewArrayOfComments} from "../../helpers/create.view.array.of.comments";
import io, {Socket} from "socket.io-client";
import TopPanel from "../TopPanel/TopPanel";

interface Props { }

const CommentsBlock:FC<Props> = ({}) => {
    const [comments, setComments] = useState<CreateCommentDtoWithId[]>([]);
    const [count, setCount] = useState<number>(0);
    const [radioValue, setRadioValue] = useState('all')
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<string>('createdAt_desc');

    const [socket, setSocket] = useState<Socket>();

    const getMainComments = useCallback(async (sortParam: string) => {
        const comments = await CommentApi.getMainComments(currentPage, sort );
        const mainComments = createArrayOfMainComments(comments.rows);
        setComments(mainComments);
        setCount(comments.count);
    },[currentPage, sort]);

    const getComments = async () => {
        const comments = await CommentApi.getAllComments(currentPage);
        setComments(createViewArrayOfComments(comments.rows));
        setCount(comments.count);
    }

    const setAllComments = async () => {
        const comments = await CommentApi.getAllComments(currentPage);
        setComments(comments.rows);
        setCount(comments.count);
    }

    useEffect(() => {
        getComments().then(r => r);
    },[currentPage]);

    const handleRadioChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
        if (e.target.value === 'main') {
            const comments = await CommentApi.getMainComments(currentPage, sort);
            const mainComments = createArrayOfMainComments(comments.rows);
            setComments(mainComments);
        } else {
            getComments().then(r => r);
        }
    }

    const getAnswers = async () => {
        const answersFromFirst = await CommentApi.getCommentAnswers('1');
        console.log('answersFromFirst: ', answersFromFirst);
    }

    useEffect(() => {
        if (radioValue === 'main') {
            getMainComments(sort).then(r => r);
            getAnswers().then(r => r);
        }
    },[getMainComments, radioValue, sort]);






    const sendComment = (comments: any) => {
        console.log('sendComment comment: ', comments);
        socket?.emit('comment', comments);
    }

    useEffect(() => {
        const newSocket = io('http://localhost:8001');
        setSocket(newSocket);
    },[setSocket]);

    const messageListener = (comments: any) => {
        console.log('commentListener')
        //newValue.push(comment);
        console.log('New comments', comments)
        setComments(comments)
    }

    useEffect(() => {
        socket?.on('comment', messageListener)
        return () => {
            socket?.off('comment', messageListener);
        }
    },[messageListener]);



    return (
        <>
            <TopPanel sendComment={sendComment} comments={comments}/>

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

        {radioValue === 'main'
            ?
            <MainComments sort={sort}
                          setSort={setSort}
                          isMainOnly={true}
                          comments={comments}
                          count={count}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          sendComment={sendComment}
            />
            :
            <Comments isMainOnly={false}
                      comments={comments}
                      count={count}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      sendComment={sendComment}
            />
            }
        </>
    );
};

export default CommentsBlock;