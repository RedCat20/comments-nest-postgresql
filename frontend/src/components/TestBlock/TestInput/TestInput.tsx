import React, { FC, useState } from 'react';
import styles from "./TestInput.module.scss";

interface Props {
    send: (val: string) => void;
}

const TestInput:FC<Props> = ({ send }) => {

    const [value, setValue] = useState('');

    return (
        <div className={styles.inputBlock}>
            <input onChange={(e) => setValue(e.target.value)}
                   value={value}
                   placeholder={'Enter text'}
                   className={styles.input}
            />
            <button
                className={styles.button }
                onClick={() => send(value)}
            >
                Enter
            </button>
        </div>
    );
};

export default TestInput;