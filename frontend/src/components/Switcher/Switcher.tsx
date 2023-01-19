import React, {ChangeEvent, FC} from 'react';
import styles from "../App.module.scss";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

interface Props {
    radioValue: string;
    handleRadioChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Switcher:FC<Props> = ({radioValue, handleRadioChange}) => {
    return (
        <div className={styles.switcher}>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Type of comments</FormLabel>
                <RadioGroup
                    aria-labelledby="comment-radio-buttons-group-label"
                    defaultValue="all"
                    name="radio-buttons-group"
                    value={radioValue}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="all" control={<Radio />} label="All comments" />
                    <FormControlLabel value="main" control={<Radio />} label="Main comments with sorting" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default Switcher;