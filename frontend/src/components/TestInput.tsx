import React, {FC, useState} from 'react';

interface Props {
    send: (val: string) => void;
}

const TestInput:FC<Props> = ({ send }) => {

    const [value, setValue] = useState('');

    return (
        <div>
            <input onChange={(e) => setValue(e.target.value)}
                   value={value}
                   placeholder={'Enter text'} />
            <button onClick={() => send(value)}>Enter</button>
        </div>
    );
};

export default TestInput;