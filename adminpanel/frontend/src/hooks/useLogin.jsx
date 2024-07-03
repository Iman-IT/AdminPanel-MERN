import { useState } from 'react';
import useAuthContext from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password, role) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Login failed');
                setLoading(false);
            } else {
                const { _id, email, token } = json; // Destructure the necessary fields
                localStorage.setItem('user', JSON.stringify({ _id, email, token }));
                dispatch({ type: 'LOGIN', payload: { _id, email, token } });
                setLoading(false);
            }
        } catch (err) {
            setError('Network error');
            setLoading(false);
        }
    };

    return { login, error, isLoading: loading };
};
