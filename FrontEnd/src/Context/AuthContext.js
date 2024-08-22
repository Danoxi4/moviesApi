import { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: { email: action.payload.email, token: action.payload.token, username: action.payload.username } };
    case 'LOGOUT':
      localStorage.clear();
      // Clear sessionStorage
      sessionStorage.clear();
      // Remove Axios Authorization Header
      delete axios.defaults.headers.common['Authorization'];
      // Return the initial state
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: { email: user.email, token: user.token, username: user.username } });
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`;
      setToken(state.user.token);
    } else {
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
    }
  }, [state.user]);

  console.log('AuthContext state:', state.user);

  return (
    <AuthContext.Provider value={{ ...state, token, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
