import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path as needed

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }

  return context;
};
