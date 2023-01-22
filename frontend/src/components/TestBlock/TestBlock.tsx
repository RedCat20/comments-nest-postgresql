import React, {useCallback, useEffect, useState} from 'react';
import io, { Socket } from "socket.io-client";

import TestInput from "./TestInput/TestInput";
import TestMessages from "./TestMessages/TestMessages";

import styles from './TestBlock.module.scss';

const TestBlock = () => {

    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);

    const send = (value: string) => {
        socket?.emit('message', value);
    }

    useEffect(() => {
        const newSocket = io('http://localhost:8001');
        setSocket(newSocket);
    },[setSocket]);

    const messageListener = useCallback((message: string) => {
        setMessages([...messages, message])
    }, [messages]);

    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {
            socket?.off('message', messageListener);
        }
    },[messageListener, socket]);

    return (
        <div className={styles.testBlock}>
            <TestInput send={send} />
            <TestMessages messages={messages} />
        </div>
    );
};

export default TestBlock;