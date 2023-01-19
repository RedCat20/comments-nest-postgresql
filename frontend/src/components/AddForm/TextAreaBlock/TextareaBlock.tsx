import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import styles from "../AddForm.module.scss";
import {FormControl, FormHelperText, TextField} from "@mui/material";

interface Props {
  updateData: (e: any) => void;
  enterTextError: boolean;
  setEnterTextError: (isError: boolean) => void;
}

const TextareaBlock:FC<Props> = ({updateData, enterTextError}) => {
    const [text, setText] = useState('');

    const addTagToText = (tag: string) => {
        const newText = text.concat(tag);
        setText(newText);
    }

    return (
        <>
            <div className={styles.tags}>
                <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<i></i>`)}>[ i ]</button>
                <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<strong></strong>`)}>[ strong ]</button>
                <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<code></code>`)}>[ code ]</button>
                <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<a href="" title=""></a>`)}>[ a ]</button>
            </div>

            <FormControl fullWidth>
                <TextField
                    name="text"
                    type="text"
                    label="Comment text *"
                    multiline
                    rows={4}
                    value={text}
                    error={enterTextError}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { updateData(e); setText(e.target.value)} }
                />
            </FormControl>

            <FormHelperText>
                You can use these tags <br/> <span className="bold-text"> {'<a href=”” title=””> </a> <code> </code> <i> </i> <strong> </strong>'} </span>
            </FormHelperText>
            {enterTextError && <div className={styles.error}>Not valid text</div>}
        </>
    );
};

export default TextareaBlock;