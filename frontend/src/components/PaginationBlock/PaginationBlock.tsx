import React, {FC, MouseEvent} from 'react';
import styles from "./PaginationBlock.module.scss";
import { Button } from "@mui/material";

interface Props {
    pages: number;
    currentPage: number;
    onChangePageHandler: (e: MouseEvent<HTMLButtonElement>, idx: number) => void;
}

const PaginationBlock:FC<Props> = ({pages, currentPage, onChangePageHandler}) => {
    return (
        <div className={styles.pages}>
            {
                new Array(pages).fill(undefined).map((item, idx) => {
                    return <Button key={idx}
                                   variant="contained"
                                   color={(currentPage - 1 === idx) ? 'warning' : 'secondary'}
                                   onClick={(e: MouseEvent<HTMLButtonElement>) => onChangePageHandler(e, idx)}
                    >
                        {idx + 1}
                    </Button>
                })
            }
        </div>
    );
};

export default PaginationBlock;