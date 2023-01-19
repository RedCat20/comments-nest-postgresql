import React, {FC} from 'react';

interface Props {
    messages: string[];
}

const TestMessages:FC<Props> = ({messages}) => {
    return (
        <div>
            {messages.map((message: string, idx: number) => {
                return (
                    <div key={idx}>{message}</div>
                )
            })}
        </div>
    );
};

export default TestMessages;