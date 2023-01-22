import React, { FC } from 'react';
import styles from "./TestMessages.module.scss";

interface Props {
    messages: string[];
}

const TestMessages:FC<Props> = ({messages}) => {
    return (
        <div className={styles.messagesBlock}>
            {messages.map((message: string, idx: number) => {
                return (
                    <div key={idx}>{idx + 1} ) {message}</div>
                )
            })}
        </div>
    );
};

export default TestMessages;