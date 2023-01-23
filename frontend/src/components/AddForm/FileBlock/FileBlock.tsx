import React, {ChangeEvent, MouseEvent, FC, useState, useRef, useEffect} from 'react';
import {FormControl} from "@mui/material";
import styles from "./FileBlock.module.scss";
import Preview from "../../FilePreview/FilePreview";
import ImageTools from "../../../helpers/image.tools";

interface Props {
    file: File | null;
    setFile: (file: File | null) => void;

    setPreviewTmp: (file: string) => void;
    setExtension: (extension: string) => void;
}

const FileBlock:FC<Props> = ({file, setFile, setPreviewTmp, setExtension}) => {

    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [open, setOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement> & {target: {files: File[], result: any}}) => {
        let uploadFile = e.target.files[0];
        // setFile(uploadFile);

        let imageTools = new ImageTools();

        imageTools.resize(uploadFile, { width: 320, height: 240 }).then((blob) => {
            // @ts-ignore
            let file = new File([blob], uploadFile.name, {type: uploadFile.type});
            console.log('file: ', file)
            setFile(file);
            // console.log(' on change file blob:', blob);
        });


        let fakeUrl = URL.createObjectURL(uploadFile);

        setExtension(uploadFile.name.substring(uploadFile.name.length - 3, uploadFile.name.length));

        setPreviewTmp(fakeUrl);  /// => url without extension, such as for blob
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