import { FC } from 'react';
import { Container, ThemeProvider } from "@mui/material";
import { themeInstance, containerStyleObj } from "../assets/theme";
import styles from './App.module.scss';

import CommentsBlock from "./CommentsBlock/CommentsBlock";


const App:FC = () => {

    return (
        <ThemeProvider theme={themeInstance}>
            <Container sx={containerStyleObj}>

                <div className={styles.content}>
                    <CommentsBlock />
                </div>

            </Container>
        </ThemeProvider>
    );
}

export default App;
