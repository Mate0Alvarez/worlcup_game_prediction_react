import { createTheme } from '@mui/material/styles';

const QatarTheme = createTheme(
    {
        palette: {
            mode: 'dark',
            primary: {
                main: '#9a1032',
            },
            secondary: {
                main: '#07c7cc',
            },
            background: {
                default: '#3e0315',
                paper: '#880c31',
            },
            info: {
                main: '#07c7cc',
            },
            error: {
                main: '#eed202',
            }
        },
        typography: {
            fontFamily: 'Poppins',
        },
    }
)

export default QatarTheme;