import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path as necessary

export const useAuthContext = () => {
  return useContext(AuthContext);
};
