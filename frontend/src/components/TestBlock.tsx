import React, {useEffect, useState} from 'react';
import TestInput from "./TestInput";
import TestMessages from "./TestMessages";
import io, {Socket} from "socket.io-client";

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

    const messageListener = (message: string) => {
        setMessages([...messages, message])
    }

    useEffect(() => {
        socket?.on('message', messageListener)
        return () => {
            socket?.off('message', messageListener);
        }
    },[messageListener]);

    return (
        <div>
            <TestInput send={send} />
            <TestMessages messages={messages} />
        </div>
    );
};

export default TestBlock;