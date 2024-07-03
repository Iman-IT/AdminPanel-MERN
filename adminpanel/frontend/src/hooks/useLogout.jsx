// hooks/useLogout.js

import { useContext } from 'react';
import { AuthContext } from '../context/useAuth';

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);

    const logout = () => {
        // Clear local storage and update authentication state
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });

        window.location.href = '/'; // Redirect using window.location.href
    };

    return logout;
};
