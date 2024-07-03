import { useState } from 'react';
import useAuthContext from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                body: formData,  // FormData object is directly sent
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                setLoading(false);
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setLoading(false);
            }
        } catch (error) {
            setError('Failed to connect to the server');
            setLoading(false);
        }
    };

    return { signup, error, isLoading: loading };
};
