import { useState, useEffect } from 'react';
import useAuthContext from './useAuthContext';

const useFetchUserData = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user._id) {
        console.log('Fetching data for user ID:', user._id);
        try {
          const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            const json = await response.json();
            console.error('Failed to fetch user data:', json.error);
            setError(json.error);
          } else {
            const json = await response.json();
            console.log('User data fetched successfully:', json);
            setUserData(json);
          }
        } catch (err) {
          console.error('Network error while fetching user data:', err.message);
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      } else {
        console.log('User ID is not defined');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userData, loading, error };
};

export default useFetchUserData;
