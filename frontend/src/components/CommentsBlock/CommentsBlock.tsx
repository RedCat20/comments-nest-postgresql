import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import styles from "./CommentsBlock.module.scss";
import {CreateCommentDtoWithId} from "../../types/comment.types";
import {CommentApi} from "../../axios";
import io, {Socket} from "socket.io-client";
import TopPanel from "../TopPanel/TopPanel";
import Comments from "./Comments/Comments";
import {Box, Button} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Props { }

const CommentsBlock:FC<Props> = ({}) => {
    const [comments, setComments] = useState<CreateCommentDtoWithId[]>([]);
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<string>('createdAt_desc');

    const [socket, setSocket] = useState<Socket>();

    const getCommentAnswers = async (id: number) => {
        const answers = await CommentApi.getCommentAnswers(id.toString());
        console.log('answers: ', answers);
        return answers;
    }

    const getComments = useCallback(async () => {
        const comments = await CommentApi.getMainComments(currentPage, sort);
        // setComments(createViewArrayOfComments(comments.rows));

        let modifiedComments = await Promise.all(
            comments.rows.map(async (item: any) => {
                const comment = await getCommentAnswers(item.id);
                return comment;
            })
        );

        // modifiedComments = modifiedComments.filter(item => item.parentId === null);

        // console.log('modifiedComments: ', modifiedComments);

        // setComments(comments.rows);
        setComments(modifiedComments);
        setCount(comments.count);
    },[currentPage,sort]);

    useEffect(() => {
        getComments().then(r => r);
        // getAnswers().then(r => r);
    },[currentPage, getComments]);

    //const getAnswers = async () => {
    //    const answersFromFirst = await CommentApi.getCommentAnswers('1');
    //     console.log('answersFromFirst: ', answersFromFirst);
    // }

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



    ///// Sorting



    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [createdDate, setCreatedDate] = useState('desc');

    const handleChangeUserName = (event: SelectChangeEvent) => {
        setUserName(event.target.value as string);
        setSort(`userName_${event.target.value}`);

        setEmail('');
        setCreatedDate('');
    };
    const handleChangeEmail = (event: SelectChangeEvent) => {
        setEmail(event.target.value as string);
        setSort(`email_${event.target.value}`);

        setUserName('');
        setCreatedDate('');
    };
    const handleChangeCreatedDate = (event: SelectChangeEvent) => {
        setCreatedDate(event.target.value as string);
        setSort(`createdAt_${event.target.value}`);

        setUserName('');
        setEmail('');
    };




    ///// Pages

    const [pages, setPages] = useState(0);

    useEffect(() => {
        setPages(Math.ceil(count / 25));
    }, [count]);

    const onClickPageHandler = (page: number) => {
        setCurrentPage(page);
    }

    const onChangePageHandler = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
        onClickPageHandler(idx + 1);
    }

    return (
        <div>
            <TopPanel sendComment={sendComment} comments={comments}/>


            <h2>Sorting</h2>

            <div className={styles.sorting}>
                <div>
                    <span>User name</span>
                    <br/> <br/>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="user-name-select-label">asc/desc</InputLabel>
                            <Select
                                labelId="user-name-select-label"
                                id="user-name-select"
                                value={userName}
                                label="asc/desc"
                                onChange={handleChangeUserName}
                            >
                                <MenuItem value={'asc'}>Ascendance</MenuItem>
                                <MenuItem value={'desc'}>Descendence</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    <span>Email</span>
                    <br/> <br/>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="email-select-label">asc/desc</InputLabel>
                            <Select
                                labelId="email-select-label"
                                id="email-select"
                                value={email}
                                label="asc/desc"
                                onChange={handleChangeEmail}
                            >
                                <MenuItem value={'asc'}>Ascendance</MenuItem>
                                <MenuItem value={'desc'}>Descendence</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    <span>Created date</span>
                    <br/> <br/>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="created-date-select-label">asc/desc</InputLabel>
                            <Select
                                labelId="created-date-select-label"
                                id="created-date-select"
                                value={createdDate}
                                label="asc/desc"
                                onChange={handleChangeCreatedDate}
                            >
                                <MenuItem value={'asc'}>Ascendance</MenuItem>
                                <MenuItem value={'desc'}>Descendence</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>


            <div className={styles.comments}>
                <Comments comments={comments} sendComment={sendComment}/>
            </div>

            <div className={styles.pages}>
                {new Array(pages).fill(undefined).map((item, idx) => {
                    return <Button key={idx}
                                   variant="contained"
                                   color={(currentPage - 1 === idx) ? 'warning' : 'secondary'}
                                   onClick={(e: MouseEvent<HTMLButtonElement>) => onChangePageHandler(e, idx)}
                    >
                        {idx + 1}
                    </Button>
                })}
            </div>

        </div>
    );
};

export default CommentsBlock;