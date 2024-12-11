import { Box, Button, Container, Grid2 } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '../..';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
        } catch (error) {
            console.error('Error signing in: ', error);
        }
    }

    return (
        <Container>
            <Grid2 container 
                style={{height: window.innerHeight - 75}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid2 style={{width: 400, background: 'lightgray'}}
                    container
                    alignItems={"center"}
                    direction={"column"}>
                    <Box p={5}>
                        <Button onClick={login} variant={'outlined'}>LogIn with Google</Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default Login;