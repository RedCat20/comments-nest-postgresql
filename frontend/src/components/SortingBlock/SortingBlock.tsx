import React, {FC} from 'react';
import styles from './SortingBlock.module.scss';
import { Box, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from "@mui/material";


interface Props {
    userName: string;
    email: string;
    createdDate: string;

    handleChangeUserName: (event: SelectChangeEvent) => void;
    handleChangeEmail: (event: SelectChangeEvent) => void;
    handleChangeCreatedDate: (event: SelectChangeEvent) => void;
}

const SortingBlock:FC<Props> = ({userName,email,createdDate,handleChangeUserName,handleChangeEmail,handleChangeCreatedDate}) => {
    return (
        <>
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
        </>
    );
};

export default SortingBlock;