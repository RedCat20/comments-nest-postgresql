import { FC } from 'react';
import styles from './App.module.scss';
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../assets/theme";

import TopPanel from "./TopPanel/TopPanel";
import CommentsBlock from "./CommentsBlock/CommentsBlock";
import TestBlock from "./TestBlock";

const containerStyle = { background: '#cccccc', minHeight: '100vh', padding: '24px' };

const App:FC = () => {

    return (
        <ThemeProvider theme={theme}>

            <Container sx={containerStyle}>

                <div className={styles.content}>

                    <TestBlock/>

                    <CommentsBlock />

                </div>

            </Container>

        </ThemeProvider>
    );
}

export default App;
