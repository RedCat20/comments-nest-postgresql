import { FC } from 'react';
import { Container, ThemeProvider } from "@mui/material";
import { themeInstance, containerStyleObj } from "../assets/theme";
import styles from './App.module.scss';

import CommentsBlock from "./CommentsBlock/CommentsBlock";
// import TestBlock from "./TestBlock/TestBlock";


const App:FC = () => {

    return (
        <ThemeProvider theme={themeInstance}>
            <Container sx={containerStyleObj}>

                <div className={styles.content}>
                    {/*<TestBlock/>*/}
                    <CommentsBlock />
                </div>

            </Container>
        </ThemeProvider>
    );
}

export default App;
