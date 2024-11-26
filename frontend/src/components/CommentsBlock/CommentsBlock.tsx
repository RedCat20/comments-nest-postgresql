import React, { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { SelectChangeEvent } from "@mui/material";
import styles from "./CommentsBlock.module.scss";

import { CreateCommentDtoWithId } from "../../types/comment.types";
import { CommentApi } from "../../axios";
import io, {Socket} from "socket.io-client";

import TopPanel from "../TopPanel/TopPanel";
import Comments from "./Comments/Comments";
import SortingBlock from "../SortingBlock/SortingBlock";
import PaginationBlock from "../PaginationBlock/PaginationBlock";


interface Props { }

const CommentsBlock:FC<Props> = ({ }) => {

    const [ comments, setComments ] = useState<CreateCommentDtoWithId[]>([]);
    const [ count, setCount ] = useState<number>(0);

    // const [ socket, setSocket ] = useState<any>();

    const [ sort, setSort ] = useState<string>('createdAt_desc');

    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ pages, setPages ] = useState(0);


    ///// Comments


    const getCommentAnswers = async (id: number) => {
        return await CommentApi.getCommentAnswers(id.toString());
    }

    const getComments = useCallback(async () => {
        const comments = await CommentApi.getMainComments(currentPage, sort);

        let modifiedComments = await Promise.all(
            comments.rows.map(async (item: any) => {
                return await getCommentAnswers(item.id);
            })
        );

        setComments(modifiedComments);
        setCount(comments.count);

    },[currentPage,sort]);

    useEffect(() => {
        getComments().then(r => r);
    },[currentPage, getComments]);


    ///// Socket


    const sendComment = (comments: any) => {
        console.log('sendComment comment: ', comments);
        // socket?.emit('comment', comments);
    }

    // useEffect(() => {
        // const HOST = window.location.origin.replace(/^http/, 'wss');
        // const HOST = window.location.origin.replace(/^http/, 'wss');
        // const HOST = 'wss://comments-nest-postgresql.onrender.com:8001';
        // const HOST = 'wss://comments-backend-9tdh.onrender.com:8001';
        // let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");
        // const newSocket = new WebSocket(HOST);
        // setSocket(newSocket);
    // },[setSocket]);

    const messageListener = (comments: any) => {
        console.log('Comment listener new comments', comments)

        getComments().then(r => r);
        // setComments(comments)
    }

    // useEffect(() => {
    //     socket?.on('comment', messageListener)
    //     return () => {
    //         socket?.off('comment', messageListener);
    //     }
    // },[messageListener]);


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


    useEffect(() => {
        setPages(Math.ceil(count / 25));
    }, [count]);

    const onClickPageHandler = (page: number) => {
        setCurrentPage(page);
    }

    const onChangePageHandler = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
        onClickPageHandler(idx + 1);
    }


    ///// View


    return (
        <div>
            <TopPanel sendComment={sendComment} comments={comments}/>

            <SortingBlock userName={userName} handleChangeUserName={handleChangeUserName}
                          email={email} handleChangeEmail={handleChangeEmail}
                          createdDate={createdDate} handleChangeCreatedDate={handleChangeCreatedDate}
            />

            <div className={styles.comments}>
                <Comments comments={comments} sendComment={sendComment}/>
            </div>

            <PaginationBlock pages={pages} currentPage={currentPage} onChangePageHandler={onChangePageHandler} />

        </div>
    );
};

export default CommentsBlock;
