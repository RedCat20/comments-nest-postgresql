import React, {FC, MouseEvent, RefObject, useCallback, useEffect, useRef} from 'react';
import styles from "./Preview.module.scss";
import DialogAlert from "../DialogAlert/DialogAlert";

interface Props {
    file: Blob | File & {type: string};
    preview: string;
    onShowPreviewHandler: (e: MouseEvent<HTMLImageElement>) => void;
    onRemoveFileHandler: (e: MouseEvent<HTMLButtonElement | HTMLInputElement>) => void;
    isViewMode?: boolean;
    open: boolean;
    setOpen: (item: boolean) => void;
}

const Preview:FC<Props> = ({file, preview, isViewMode = false, onShowPreviewHandler, onRemoveFileHandler, open, setOpen}) => {
    const textPreviewRef = useRef<HTMLDivElement>(null);
    const textPreviewBigRef = useRef<HTMLDivElement>(null);

    function readTextFileContent(file: Blob) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event: any) => resolve(event.target.result)
            reader.onerror = error => reject(error)
            reader.readAsText(file);
        })
    }

    const setPreviewText = useCallback(async (file: Blob, ref: RefObject<HTMLDivElement> = textPreviewRef) => {
        readTextFileContent(file).then (res => {
            if (ref?.current && typeof res === "string") {
                // console.log('res: ', res)
                ref.current.innerHTML = res;
            }
        });
    }, []);

    useEffect(() => {
        if (!file || !(file?.type === "text/plain")) return;
        if (open) {
            setPreviewText(file, textPreviewBigRef).then(r => r);
        }
        setPreviewText(file).then(r => r);
    },[file, open, preview, setPreviewText]);

    return (
        <>
        <div className={styles.preview}>
            {(file.type === 'image/jpeg' || file.type === "image/png" || file.type === "image/gif")
                &&
              <div className={styles.previewWrap}>
                <img className={styles.imgPreview} src={preview} alt="Preview" onClick={onShowPreviewHandler}/>
                  {!isViewMode && <button type="button"
                        className={styles.previewBtn}
                        onClick={onRemoveFileHandler}
                >
                  X
                </button>}
              </div>
            }
            {file.type === "text/plain" &&
              <div className={styles.previewWrap}>
                <div className={styles.textPreview} ref={textPreviewRef} onClick={onShowPreviewHandler}/>
                  {!isViewMode && <button type="button"
                        className={styles.previewBtn}
                        onClick={onRemoveFileHandler}
                >
                  X
                </button>}
              </div>
            }
        </div>

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
                    <div className={styles.textPreviewBig} ref={textPreviewBigRef}/>
                  </div>
                }
            </div>
        </DialogAlert>
        </>
    );
};

export default Preview;