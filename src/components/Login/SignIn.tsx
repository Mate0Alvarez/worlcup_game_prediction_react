import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../context/ProdeContext';
import { ISignInFormErrors } from '../../interfaces/interfaces';
import { ProdeContextType } from '../../types/types';
import SnackbarPush from '../utils/SnackbarPush';
import SingInFormValidation from './SignInFormValidation';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Mate0Alvarez">
                Mateo Álvarez
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignInSide() {

    const { userData, logInUser, setShowNavBarAndFooter } = useContext(AppCtx) as ProdeContextType;

    const [formErrors, setFormErrors] = useState<ISignInFormErrors>({
        email: false,
        password: false
    })
    const [loginError, setLoginError] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setloading(true);
        const data = new FormData(event.currentTarget);

        resetFormErrors();

        const formValidation = await SingInFormValidation({
            email: data.get('email'),
            password: data.get('password')
        })

        if (!formValidation.validForm) {
            return setFormErrors(formValidation.newFormErrors);
        }

        const logged = await logInUser(formValidation.formData.email, formValidation.formData.password);

        if (!logged) {
            setloading(false);
            return setLoginError(true);
        }
        return navigate('/');
    };

    const resetFormErrors = () => {
        return setFormErrors({
            email: false,
            password: false
        })
    }

    useEffect(() => {
        if (userData) {
            return navigate('/fixture');
        }

        setShowNavBarAndFooter(false);
    }, [userData])


    return (
        <>
            {loginError && (
                <SnackbarPush text_error='Ups! Invalid user email or password' severity='error'></SnackbarPush>
            )}

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: 'url("/background.svg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: "flex",
                        justifyContent:"center",
                        alignItems:"center"
                    }}
                >
                <Box
                            sx={{
                                m: 1,
                                width: "100%",
                            }}
                            component="img"
                            alt="Ilustration of two men sitting in a sofa."
                            src="/signin.svg"
                        />
                </Grid>
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                m: 1,
                                width: "120px",
                            }}
                            component="img"
                            alt="Qatar Wolrd Cup 2022."
                            src="/qatar_logo.svg"
                        />
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                color='secondary'
                                helperText={formErrors.email && "Please enter a your e-mail address"}
                                error={formErrors.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color='secondary'
                                helperText={formErrors.password && "Please enter your password"}
                                error={formErrors.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, minHeight: '40px' }}
                            >
                                {!loading && ("Sign In")}
                                {loading && (
                                    <Box sx={{ width: "100%" }}>
                                        <LinearProgress sx={{ borderRadius: 5 }} />
                                    </Box>
                                )}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" sx={{ color: 'secondary.light' }}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2" sx={{ color: 'secondary.light' }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}