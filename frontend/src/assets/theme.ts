import { createTheme } from "@mui/material";

export const themeInstance: any = createTheme({
    palette: {
        primary: {
            main: '#9576b9',
        },
        secondary: {
            main: '#cfcfcf',
        },
        warning: {
            main: '#fae7ae',
        }
    },
});

export const containerStyleObj = {
    background: '#cccccc',
    minHeight: '100vh',
    padding: '24px'
};