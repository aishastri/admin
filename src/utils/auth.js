// src/utils/auth.js

export const isAuthenticated = () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt='))
      ?.split('=')[1];
    
    return !!token;
  };
  
  export const getToken = () => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt='))
      ?.split('=')[1];
  };
  