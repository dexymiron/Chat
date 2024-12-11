import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../../utils/utils';
import { Context } from '../..';
import {useAuthState} from 'react-firebase-hooks/auth';

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return user ? (   
            <Routes>
                {privateRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
                <Route path="*" element={<Navigate to={CHAT_ROUTE} replace/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace/>}/>
            </Routes>)
}

export default AppRouter;    