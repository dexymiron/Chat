import { AppBar, Button, Grid2, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/utils';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Context } from '../..';
import {signOut} from 'firebase/auth';

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('User signed out');
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      };

    return (
        <AppBar color={'secondary'} position="static">
            <Toolbar>
                <Grid2 container justifyContent={'flex-end'} flexBasis={'100%'} spacing={1}>
                    {user ? (
                        <Button onClick={handleLogout} variant={'contained'}>Log Out</Button>)
                    :
                    (<NavLink to={LOGIN_ROUTE}>
                        <Button variant={'contained'} >Login</Button>
                    </NavLink>)
                    }
                </Grid2>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;