import {FC, FormEvent, useState} from 'react';
import {Box, Button, FormControl, FormHelperText, Paper, TextField, Typography} from "@mui/material";
import styles from "./AddForm.module.scss";
import {validateForm} from '../../helpers/validate.form';
import {CommentApi, FilesApi} from "../../axios";
import {CommentWithCaptcha, ConvertedCommentDto} from "../../types/comment.types";
import captchaImg from "../../assets/img/captcha.jpg";
import FileBlock from "./FileBlock/FileBlock";
import TextareaBlock from "./TextAreaBlock/TextareaBlock";
import {IFormData} from "../../types/form.data";
import DialogAlert from "../DialogAlert/DialogAlert";
import CommentPreview from "../CommentPreview/CommentPreview";

export const CORRECT_CAPTCHA = 'smwm';

interface Props {
    title?: string;
    title2?: string;
    setIsShow?: (value: boolean) => void;
    specialCallback?: any;
    parent?: ConvertedCommentDto | null;
    sendComment: (value: any) => void;
    comments: any;
}

const AddForm:FC<Props> = ({title,
                            setIsShow,
                            specialCallback,
                            parent,
                            title2= 'Preview',
                            sendComment,
                            comments
}) => {

    const [openDialog, setOpenDialog] = useState(false);

    const [previewTmp, setPreviewTmp] = useState('');

    const [file, setFile] = useState<File | null>(null);

    const [data, setData] = useState<IFormData>({
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
            // console.log('fileName: ', fileName);
            if (fileName) {
                bodyFormData.append('file', fileName);
            }
            // console.log(file);
        } catch(err) {
            console.log(err);
        }

        try {
            let comment: CommentWithCaptcha;

            // console.log('All comments from add form: ', comments);

            if (parent?.id) {
                comment = await CommentApi.addComment({...data, answers: [], file: fileName, rootId: parent.rootId, parentId: parent.id, level: (parent.level + 1)});

                // let parentComment = await CommentApi.getOneComment(parent.id.toString());

                // let answers: any = [];

                // if ((parentComment.answers === null) || (parentComment.answers?.length === 0) ) {
                //    answers = [comment.id];
                // } else {
                //     const arr = [...parentComment.answers];
                //     arr.push(comment.id);
                //     answers = arr;
                // }

                // let updatedComment = await CommentApi.updateComment(
                //    {...parentComment, answers: answers},
                //    parent.id
                // );

                // console.log('updatedComment: ', updatedComment);

                sendComment([...comments, comment]);

            } else {
                comment = await CommentApi.addComment({...data, answers: [], file: fileName, parentId: null, level: 1, rootId: null});

                // let updatedComment = await CommentApi.updateComment(
                //    {...data, answers: comment.answers, parentId: null, level: 1, rootId: comment.id},
                //    comment.id
                // );

                //console.log('updatedComment: ', updatedComment);

                sendComment([...comments, comment]);
            }

            // const editedComment: any = {...comment};

            // if (editedComment.captcha)
            //     delete editedComment.captcha;

        } catch(err) {
            console.log(err);
        } finally {
            if (setIsShow)
                setIsShow(false);
            if (specialCallback && specialCallback(true))
                specialCallback();
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
                       <FileBlock file={file} setFile={setFile} setPreviewTmp={setPreviewTmp}/>
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
                            {title2}

                        </Button>

                        <Button
                            type="submit"
                            sx={{width: '200px'}}
                            variant="contained"
                            color="primary">
                            {title}
                        </Button>
                    </div>

                </form>

            </Paper>

            <DialogAlert open={openDialog} setOpen={setOpenDialog} >
                <CommentPreview comment={{userName: data.userName, email: data.email, homePage: data.homePage, text: data.text, createdAt: new Date(Date.now()), file: file}} previewTmp={previewTmp} />
            </DialogAlert>

        </>
    );
};

export default AddForm;