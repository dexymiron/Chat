    import { AppBar, Button, Grid, Grid2, Toolbar } from '@mui/material';
    import React, { useContext } from 'react';
    import { NavLink } from 'react-router-dom';
    import { CHAT_ROUTE, LOGIN_ROUTE, MAP_ROUTE, STRIPE_ROUTE } from '../../utils/utils';
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
                    <Grid2 container justifyContent={'space-between'} flexBasis={'100%'} spacing={1}>
                        {user ? (
                            <>  
                                <Grid2 container spacing={1}>
                                    <Grid2>
                                <Button component={NavLink} to={MAP_ROUTE} variant={'contained'}>Map</Button>
                                    </Grid2>
                                    <Grid2>
                                <Button component={NavLink} to={CHAT_ROUTE} variant={'contained'}>Chat</Button>
                                    </Grid2>
                                    <Grid2>
                                <Button component={NavLink} to={STRIPE_ROUTE} variant={'contained'}>Subscribtion</Button>
                                    </Grid2>
                                </Grid2>
                                <Button onClick={handleLogout} variant={'contained'}>Log Out</Button>
                            </>
                            )
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