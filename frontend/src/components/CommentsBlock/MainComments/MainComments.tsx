import { FC, useEffect, useState, MouseEvent } from "react";
import { ConvertedCommentDto, CreateCommentDtoWithId } from "../../../types/comment.types";
import styles from './MainComments.module.scss';
import {Box, Button} from "@mui/material";
import Comment from '../CommentItem/Comment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    comments: CreateCommentDtoWithId[];
    count: number;
    isMainOnly: boolean;
    currentPage: number;
    setCurrentPage: (value: number) => void;
    sendComment: (value: any) => void;
    sort: string;
    setSort: (value: string) => void;
}

const MainComments:FC<Props> = ({   comments,
                                    count,
                                    isMainOnly,
                                    currentPage,
                                    setCurrentPage,
                                    sort,
                                    sendComment,
                                    setSort}) => {
    const [pages, setPages] = useState(0);

    useEffect(() => {
        setPages(Math.ceil(count / 25));
    }, [count]);

    const onClickPageHandler = (page: number) => {
        setCurrentPage(page);
    }

    const onChangePageHandler = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
        onClickPageHandler(idx + 1);
    }

    const renderComments = (commentsCopy: any = comments) => {
        if (comments) {
            console.log('Main comments: ', comments);
            return (
                <>
                    {commentsCopy.map((item: ConvertedCommentDto, idx: number) => {
                        if (isMainOnly || item.answers?.length === 0) {
                            return <Comment key={`comment_${idx}`} comment={item} renderComments={this}/>
                        } else {
                            return ( <Comment key={item.id} comment={item}renderComments={this}>
                                {item.answers?.length > 0 &&
                                    item.answers.map((ans: any, idx: number) => {
                                        return <Comment key={`${ans.id}_${idx}`} comment={ans} renderComments={this}/>;
                                    })}
                            </Comment> )
                        }
                    } )}
                </>
            )
        }
        return null
    }

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [createdDate, setCreatedDate] = useState('desc');

    const handleChangeUserName = (event: SelectChangeEvent) => {
        setUserName(event.target.value as string);
        setSort(`userName_${event.target.value}`);

        setEmail('');
        setCreatedDate('');
    };
    const handleChangeEmail = (event: SelectChangeEvent) => {
        setEmail(event.target.value as string);
        setSort(`email_${event.target.value}`);

        setUserName('');
        setCreatedDate('');
    };
    const handleChangeCreatedDate = (event: SelectChangeEvent) => {
        setCreatedDate(event.target.value as string);
        setSort(`createdAt_${event.target.value}`);

        setUserName('');
        setEmail('');
    };

    return (
        <>
            {comments?.length === 0 &&
              <div className={styles.noComments}>No comments, please add smth</div>
            }

            <h2>Sorting</h2>

            <div className={styles.sorting}>
                <div>
                    <span>User name</span>
                    <br/> <br/>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="user-name-select-label">asc/desc</InputLabel>
                            <Select
                                labelId="user-name-select-label"
                                id="user-name-select"
                                value={userName}
                                label="asc/desc"
                                onChange={handleChangeUserName}
                            >
                                <MenuItem value={'asc'}>Ascendance</MenuItem>
                                <MenuItem value={'desc'}>Descendence</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    <span>Email</span>
                    <br/> <br/>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="email-select-label">asc/desc</InputLabel>
                            <Select
                                labelId="email-select-label"
                                id="email-select"
                                value={email}
                                label="asc/desc"
                                onChange={handleChangeEmail}
                            >
                                <MenuItem value={'asc'}>Ascendance</MenuItem>
                                <MenuItem value={'desc'}>Descendence</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    <span>Created date</span>
                    <br/> <br/>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="created-date-select-label">asc/desc</InputLabel>
                            <Select
                                labelId="created-date-select-label"
                                id="created-date-select"
                                value={createdDate}
                                label="asc/desc"
                                onChange={handleChangeCreatedDate}
                            >
                                <MenuItem value={'asc'}>Ascendance</MenuItem>
                                <MenuItem value={'desc'}>Descendence</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>

            {renderComments()}

            <div className={styles.pages}>
                {new Array(pages).fill(undefined).map((item, idx) => {
                    return <Button key={idx}
                                   variant="contained"
                                   color={(currentPage - 1 === idx) ? 'warning' : 'secondary'}
                                   onClick={(e: MouseEvent<HTMLButtonElement>) => onChangePageHandler(e, idx)}
                    >
                        {idx + 1}
                    </Button>
                })}
            </div>
        </>
    );
};

export default MainComments;