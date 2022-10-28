import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { IFormErrors } from '../../types/types';
import SignUpFormValidation from './SignUpFormValidation';
import {registerWithEmailAndPassword, logInWithEmailAndPassword} from '../../firebase/api';
import { useNavigate } from 'react-router-dom';

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

export default function SignUpSide() {
    const [formErrors, setFormErrors] = useState<IFormErrors>({
        name: false,
        email: false,
        password: false,
        confirm_password: false
    });

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
    
            resetFormErrors()
    
            const formValidation = await SignUpFormValidation({
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password'),
                confirm_password: data.get('confirm_password')
            })
    
            if (!formValidation.validForm) {
                return setFormErrors(formValidation.newFormErrors);
            }
    
            await registerWithEmailAndPassword(formValidation.formData.name, formValidation.formData.email, formValidation.formData.password);
    
            await logInWithEmailAndPassword(formValidation.formData.email, formValidation.formData.password);
            
            navigate('/games');

        } catch (error) {
            console.error(error);
        }
    };

    const resetFormErrors = () => {
        return setFormErrors({
            name: false,
            email: false,
            password: false,
            confirm_password: false
        });
    }

    return (
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
                }}
            />
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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your name"
                            name="name"
                            autoComplete="Your name"
                            autoFocus
                            color='secondary'
                            helperText={formErrors.name && "Please enter your name"}
                            error={formErrors.name}
                        />
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
                            helperText={formErrors.email && "Please enter a valid e-mail address"}
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
                            autoComplete="password"
                            color='secondary'
                            helperText={formErrors.password && "Please enter a password"}
                            error={formErrors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm password"
                            type="password"
                            id="confirm_password"
                            autoComplete="Confirm password"
                            color='secondary'
                            helperText={formErrors.confirm_password && "The passwords don't match"}
                            error={formErrors.confirm_password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}