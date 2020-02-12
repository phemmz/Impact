import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';


export const GeneralContext = createContext();

const Provider = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [isAdmin, setAdmin] = useState(isAuthenticated);

  const login = (inputValues) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username === inputValues.username && password === inputValues.password) {
      setAdmin(true);
      localStorage.setItem('isAuthenticated', true);
      return true;
    }
    return false;
  }

  return (
    <GeneralContext.Provider value={{ isAdmin, setAdmin, login }}>
      {children}
    </GeneralContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired
};

export default Provider;
