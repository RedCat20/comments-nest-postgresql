import React, {ChangeEvent, MouseEvent, FC, useState, useRef, useEffect} from 'react';
import {FormControl} from "@mui/material";
import styles from "./FileBlock.module.scss";
import Preview from "../../Preview/Preview";

interface Props {
    file: File | null;
    setFile: (file: File | null) => void;
}

const FileBlock:FC<Props> = ({file, setFile}) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [open, setOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement> & {target: {files: File[], result: any}}) => {
        let uploadFile = e.target.files[0];
        setFile(uploadFile);
    }

    const onRemoveFileHandler = (e: MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
        setPreviewUrl('');
        setFile(null);
        if (fileInputRef?.current?.value) {
            fileInputRef.current.value = '';
        }
    }

    const onShowPreviewHandler = (e: MouseEvent<HTMLImageElement>) => {
        setOpen(true);
    }

     useEffect(() => {
         if (file) {
             setPreviewUrl(URL.createObjectURL(file));
         }
     }, [file]);

    return (
        <>
            <FormControl fullWidth>
                <div className={styles.file}>
                    <input ref={fileInputRef}
                           type="file"
                           name="file"
                           onChange={onChangeFileHandler}
                    />
                    {file && <Preview file={file}
                             preview={previewUrl}
                             onShowPreviewHandler={onShowPreviewHandler}
                             onRemoveFileHandler={onRemoveFileHandler}
                             open={open}
                             setOpen={setOpen}
                    />}
                </div>
            </FormControl>
        </>
    );
};

export default FileBlock;