import React, {ChangeEvent, MouseEvent, FC, useState, useRef, useEffect} from 'react';
import {FormControl} from "@mui/material";
import styles from "./FileBlock.module.scss";
import DialogAlert from "../../DialogAlert/DialogAlert";
import Form from "../Form";

interface Props {
    file: File | null;
    setFile: (file: File | null) => void;
}

const FileBlock:FC<Props> = ({file, setFile}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textPreviewRef = useRef<HTMLDivElement>(null);
    const textPreviewRefBig = useRef<HTMLDivElement>(null);
    const [preview, setPreview] = useState<string>('');
    const [open, setOpen] = useState(false);


    function readFileContent(file: Blob) {
        // console.log('readFileContent')
        const reader = new FileReader()

        return new Promise((resolve, reject) => {
            // @ts-ignore
            reader.onload = event => resolve(event.target.result)
            reader.onerror = error => reject(error)
            reader.readAsText(file);
        })
    }

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement> & {target: {files: File[], result: any}}) => {
        let uploadFile = e.target.files[0];
        setFile(uploadFile);
        setPreview(URL.createObjectURL(uploadFile));
        readFileContent(uploadFile).then (res => {
            // console.log('res: ', res);
            // console.log('textPreviewRef?.current: ', textPreviewRef?.current);
            if (textPreviewRef?.current) {
                // @ts-ignore
                textPreviewRef.current.innerHTML = res;
            }
        });
    }

    const onRemoveFileHandler = (e: MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
        setPreview('');
        setFile(null);
        if (fileInputRef?.current?.value) {
            fileInputRef.current.value = '';
        }
    }

    const onShowPreviewHandler = (e: MouseEvent<HTMLImageElement>) => {
        setOpen(true);
    }

    useEffect(() => {
        if (open && file) {
            setPreview(URL.createObjectURL(file));
            readFileContent(file).then (res => {
                if (textPreviewRefBig?.current) {
                    // @ts-ignore
                    textPreviewRefBig.current.innerHTML = res;
                }
            });
        }
    }, [file, open]);

    return (
        <>
            <FormControl fullWidth>
                <div className={styles.file}>
                    <input ref={fileInputRef}
                           type="file"
                           name="file"
                           onChange={onChangeFileHandler}
                    />
                    <div className={styles.preview}>
                        {(file?.type === 'image/jpeg' || file?.type === "image/png" || file?.type === "image/gif")
                            &&
                          <div className={styles.previewWrap}>
                              <img className={styles.imgPreview} src={preview} alt="Preview" onClick={onShowPreviewHandler}/>
                              <button type="button"
                                      className={styles.previewBtn}
                                      onClick={onRemoveFileHandler}
                              >
                                X
                              </button>
                          </div>
                        }
                        {file?.type === "text/plain" &&
                            <div className={styles.previewWrap}>
                                <div className={styles.textPreview} ref={textPreviewRef} onClick={onShowPreviewHandler}/>
                                <button type="button"
                                      className={styles.previewBtn}
                                      onClick={onRemoveFileHandler}
                                >
                                    X
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </FormControl>

            <DialogAlert open={open} setOpen={setOpen} >
                <div className={styles.previewDialog}>
                    {(file?.type === 'image/jpeg' || file?.type === "image/png" || file?.type === "image/gif")
                        &&
                      <div className={styles.previewWrapBig}>
                        <img className={styles.imgPreviewBig} src={preview} alt="Preview"/>
                      </div>
                    }
                    {file?.type === "text/plain" &&
                      <div className={styles.previewWrapBig}>
                        <div className={styles.textPreviewBig} ref={textPreviewRefBig}/>
                      </div>
                    }
                </div>
            </DialogAlert>
        </>
    );
};

export default FileBlock;