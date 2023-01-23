import { FC, FormEvent, useState } from 'react';
import { Box, Button, FormControl, FormHelperText, Paper, TextField, Typography } from "@mui/material";
import { CommentApi, FilesApi } from "../../axios";

import styles from "./AddForm.module.scss";

import { validateForm } from '../../helpers/validate.form';
import { CommentWithCaptcha, ConvertedCommentDto } from "../../types/comment.types";
import { IFormData } from "../../types/form.data";
import captchaImg from "../../assets/img/captcha.jpg";

import FileBlock from "./FileBlock/FileBlock";
import TextareaBlock from "./TextAreaBlock/TextareaBlock";
import DialogAlert from "../DialogAlert/DialogAlert";
import CommentPreview from "../CommentPreview/CommentPreview";


interface Props {
    title?: string;
    specialCallback?: any;
    parent: ConvertedCommentDto | null;
    sendComment: (value: any) => void;
    comments: any;
}

const AddForm:FC<Props> = ({ title, specialCallback, parent, sendComment, comments}) => {

    const [ openDialog, setOpenDialog ] = useState(false);

    const [ file, setFile ] = useState<File | null>(null);
    const [ previewTmp, setPreviewTmp ] = useState('');

    const [ extension, setExtension ] =  useState('');

    const [ data, setData ] = useState<IFormData>({
        userName: '',
        email: '',
        homePage: '',
        captcha: '',
        text: '',
    });

    const updateData = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const [enterCaptchaError, setEnterCaptchaError] = useState(false);
    const [enterUserNameError, setEnterUserNameError] = useState(false);
    const [enterEmailError, setEnterEmailError] = useState(false);
    const [enterHomePageError, setEnterHomePageError] = useState(false);
    const [enterTextError, setEnterTextError] = useState(false);

    const [isEmptyRequiredFields, setIsEmptyRequiredFields] = useState(false);

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        let isEmpty = false;

        if (!(data.userName.length) || !(data.email.length) || !(data.captcha.length) || !(data.text.length)) {
            setIsEmptyRequiredFields(true);
            isEmpty = true;
        } else {
            setIsEmptyRequiredFields(false);
        }

        const isError = validateForm(data, setEnterCaptchaError, setEnterUserNameError, setEnterEmailError, setEnterHomePageError, setEnterTextError);

        if (isError || isEmpty) { return;  }

        const imageFormData = new FormData();
        if (file) {
            imageFormData.append('files', file);
        }

        let bodyFormData = new FormData();

        Object.keys(data).forEach((key) => {
            bodyFormData.append(key.toString(), data[key].toString());
        })

        let fileName;

        try {
            fileName = await FilesApi.addFile(imageFormData);
            if (fileName) {
                bodyFormData.append('file', fileName);
            }
        }
        catch(err) {
            console.log(err);
        }

        try {
            let comment: CommentWithCaptcha;

            if (parent?.id) {
                comment = await CommentApi.addComment({...data, answers: [], file: fileName, rootId: parent.rootId, parentId: parent.id, level: (parent.level + 1)});
                sendComment([...comments, comment]);

            } else {
                comment = await CommentApi.addComment({...data, answers: [], file: fileName, parentId: null, level: 1, rootId: null});
                sendComment([...comments, comment]);
            }
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if (specialCallback && specialCallback(true)) {
                specialCallback();
            }
        }
    }

    return (
        <>
            <Paper className={styles.form}>

                <div className={styles.block}>
                    <Typography align="center" variant="h6">{title}</Typography>
                </div>

                <form onSubmit={onSubmitHandler}>

                    {/* User name */}
                    <div className={styles.block}>
                        <FormControl fullWidth>
                            <TextField size="small" error={enterUserNameError} name="userName" type="text" label="User name *" variant="outlined" onChange={updateData}/>
                            <FormHelperText>Numbers and latin letters only.</FormHelperText>
                            {enterUserNameError && <div className={styles.error}>Not valid user name</div>}
                        </FormControl>
                    </div>

                    {/* Email */}
                    <div className={styles.block}>
                        <FormControl fullWidth>
                            <TextField size="small" error={enterEmailError} name="email" type="text" fullWidth label="Email *" variant="outlined" onChange={updateData}/>
                            <FormHelperText>Email format such as myemail@mail.com.</FormHelperText>
                            {enterEmailError && <div className={styles.error}>Not valid email</div>}
                        </FormControl>
                    </div>

                    {/* Home page */}
                    <div className={styles.block}>
                        <FormControl fullWidth>
                            <TextField size="small" error={enterHomePageError} name="homePage" type="text" fullWidth label="Homepage" variant="outlined" onChange={updateData}/>
                            <FormHelperText>Url format such as https://mysite.com.</FormHelperText>
                            {enterHomePageError && <div className={styles.error}>Not valid url</div>}
                        </FormControl>
                    </div>

                    {/* Captcha */}
                    <div className={styles.block}>
                        <Box className={`${styles.block} ${styles.captcha}`}>
                            <img src={captchaImg} alt="Captcha"/>
                            <FormControl fullWidth>
                                <TextField size="small" error={enterCaptchaError} name="captcha" type="text" label="Captcha *" variant="outlined" onChange={updateData}/>
                                <FormHelperText>Please enter the captcha from picture.</FormHelperText>
                                {enterCaptchaError && <div className={styles.error}>Not valid captcha</div>}
                            </FormControl>
                        </Box>
                    </div>

                    {/* Text */}
                    <div className={styles.block}>
                        <TextareaBlock updateData={updateData} enterTextError={enterTextError} setEnterTextError={setEnterTextError}/>
                    </div>

                    {/* File */}
                    <div className={styles.block}>
                       <FileBlock file={file} setFile={setFile} setPreviewTmp={setPreviewTmp} setExtension={setExtension}/>
                    </div>

                    {/* Validation result */}
                    {isEmptyRequiredFields && <div className={`${styles.error} ${styles.big}`}>There are empty required fields!</div>}

                    <div className={`${styles.sendBtnWrap}`}>
                        <Button
                            type="button"
                            sx={{width: '200px'}}
                            variant="contained"
                            onClick={ () => setOpenDialog(true) }
                            color="info"
                        >
                            Preview

                        </Button>

                        <Button
                            type="submit"
                            sx={{width: '200px'}}
                            variant="contained"
                            color="primary"
                        >
                            Add a comment
                        </Button>
                    </div>

                </form>

            </Paper>

            <DialogAlert open={openDialog} setOpen={setOpenDialog} >
                <CommentPreview
                    data={{...data, createdAt: new Date(Date.now())}}
                    previewTmp={previewTmp}
                    extension={extension}
                    file={file}
                />
            </DialogAlert>

        </>
    );
};

export default AddForm;