import {ChangeEvent, FC, FormEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import {Box, Button, FormControl, FormHelperText, Paper, TextField, Typography} from "@mui/material";
import styles from "./Form.module.scss";
import {validateForm} from '../../helpers/validate.form';
import {CommentApi} from "../../data/axiosInstance";
import {CreateCommentDto, CreateCommentDtoWithId} from "../../data/types";
import captchaImg from "../../assets/img/captcha.jpg";
import {getParentComment} from "../../helpers/get.parent.helper";

interface Props {
    title?: string;
    setIsShow?: (value: boolean) => void;
    comments: { captcha: string; level: number; answers?: number[]; text: string; id: number; userName: string; homePage: string; email: string; parentId?: number }[];
    setComments: (value: { captcha: string; level: number; answers?: number[]; text: string; id: number; userName: string; homePage: string; email: string; parentId?: number }[]) => void;
    specialCallback?: any;
    parent?: CreateCommentDtoWithId | null;
}

const Form:FC<Props> = ({title,
                            setIsShow,
                            comments = [],
                            setComments,
                            specialCallback,
                            parent
}) => {

    const textRef = useRef<any>(null);
    const [text, setText] = useState('');

    const [data, setData] = useState<any>({
        userName: '',
        email: '',
        homePage: '',
        captcha: '',
        text: '',
    });

    useEffect(() => {
        setText('')
    },[]);

    const updateData = (e: any) => {
        // setText(e.target.value);
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

        let bodyFormData = new FormData();

        Object.keys(data).forEach((key) => {
            bodyFormData.append(key.toString(), data[key].toString());
        });

        //if (parent) {
           // const parentComment = await getParentComment(parent.id);
           // console.log('parentComment', parentComment);
        //}

        try {
            let comment: CreateCommentDtoWithId;

            if (parent?.id) {
                comment = await CommentApi.addComment({...data, parentId: parent.id, level: (parent.level + 1)});

                let parentComment = await CommentApi.getOneComment(parent.id.toString());

                let answers: any = [];

                if ((parentComment.answers === null) || (parentComment.answers?.length === 0) ) {
                    answers = await [comment.id];
                } else {
                    const ans = parentComment.answers;
                    console.log('ans: ', ans);
                    let arr = [];
                    for (let item in ans) {
                        if (item !== 'length') {
                            arr.push(item)
                        }
                    }
                    arr.push(comment.id)
                    answers = arr;
                }

                // await CommentApi.updateComment({...parentComment, answers: [99999]}, parent.id)
                await CommentApi.updateComment({...parentComment, answers: answers}, parent.id)
            } else {
                comment = await CommentApi.addComment({...data, parentId: null, level: 1});
            }

            console.log('Added comment', comment);

            //if (parent?.id) {
                setComments([...comments, comment]);
            //}
           // else {
            //    setComments([comment]);
           // }

        } catch(err) {
            console.log(err);
        } finally {
            if (setIsShow)
                setIsShow(false);
            if (specialCallback && specialCallback(true))
                specialCallback();
        }
    }

    const addTagToText = (tag: string) => {

        const newText = text.concat(tag);
        setText(newText);

        // setData({
        //     ...data,
        //     text: newText
        // })
    }

    return (
        <Paper className={styles.form}>
            <div className={styles.block}>
                <Typography align="center" variant="h6">{title}</Typography>
            </div>

            <form onSubmit={onSubmitHandler}>

                <div className={styles.block}>
                    <FormControl fullWidth>
                        <TextField error={enterUserNameError} name="userName" type="text" label="User name *" variant="outlined" onChange={updateData}/>
                        <FormHelperText>Numbers and latin letters only.</FormHelperText>
                        {enterUserNameError && <div className={styles.error}>Not valid user name</div>}
                    </FormControl>
                </div>

                <div className={styles.block}>
                    <FormControl fullWidth>
                        <TextField error={enterEmailError} name="email" type="text" fullWidth label="Email *" variant="outlined" onChange={updateData}/>
                        <FormHelperText>Email format such as myemail@mail.com.</FormHelperText>
                        {enterEmailError && <div className={styles.error}>Not valid email</div>}
                    </FormControl>
                </div>


                <div className={styles.block}>
                    <FormControl fullWidth>
                        <TextField error={enterHomePageError} name="homePage" type="text" fullWidth label="Homepage" variant="outlined" onChange={updateData}/>
                        <FormHelperText>Url format such as https://mysite.com.</FormHelperText>
                        {enterHomePageError && <div className={styles.error}>Not valid url</div>}
                    </FormControl>
                </div>


                <div className={styles.block}>
                    <Box className={`${styles.block} ${styles.captcha}`}>
                        <img src={captchaImg} alt="Captcha *"/>
                        <FormControl fullWidth>
                            <TextField error={enterCaptchaError} name="captcha" type="text" label="Captcha" variant="outlined" onChange={updateData}/>
                            <FormHelperText>Please enter the captcha from picture.</FormHelperText>
                            {enterCaptchaError && <div className={styles.error}>Not valid captcha</div>}
                        </FormControl>
                    </Box>
                </div>

                <div className={styles.block}>


                    <div className={styles.tags}>
                        <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<i></i>`)}>[ i ]</button>
                        <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<strong></strong>`)}>[ strong ]</button>
                        <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<code></code>`)}>[ code ]</button>
                        <button type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => addTagToText(`<a href="" title=""></a>`)}>[ a ]</button>
                    </div>

                    <FormControl fullWidth>
                        <TextField ref={textRef}
                                   name="text"
                                   type="text"
                                   label="Comment text *"
                                   multiline
                                   rows={8}
                                   value={text}
                                   error={enterTextError}
                                   onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { updateData(e); setText(e.target.value)} }
                        />
                    </FormControl>

                    <FormHelperText>
                        You can use these tags <br/> <span className="bold-text"> {'<a href=”” title=””> </a> <code> </code> <i> </i> <strong> </strong>'} </span>
                    </FormHelperText>
                    {enterTextError && <div className={styles.error}>Not valid text</div>}

                </div>

                {isEmptyRequiredFields && <div className={`${styles.error} ${styles.big}`}>There are empty required fields!</div>}

                <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                    <Button
                        type="submit"
                        sx={{width: '200px'}}
                        variant="contained"
                        color="primary">
                        {title}
                    </Button>
                </Box>

            </form>

        </Paper>
    );
};

export default Form;