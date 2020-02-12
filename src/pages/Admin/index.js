import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import { GeneralContext } from '../../context/GeneralContext';
import { validateLogin } from '../../utils/helper';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.4rem 1rem;
  border: 1px solid #4065e0;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #fff;
  background-color: #4065E0;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const Input = styled.input`
  height: 2.2rem;
  width: 100%;
  padding: 0.1rem 0.4rem;
  border-radius: 0.4rem;
  border: 1px solid ${({ hasError }) => hasError ? '#ca2c37' : '#e3e9ed'};
  font-size: 1rem;
  background-color: #fff;
  box-shadow: ${({ hasError }) => hasError ? '' : '0 0 1px #4065e0'};
  &:focus {
    outline: 0;
  }
`;

const Admin = () => {
  const [inputValues, setInput] = useState({
    username: '',
    password: ''
  });

  const [errorMessages, setErrorMessage] = useState({ general: ''});
  const { login } = useContext(GeneralContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = validateLogin(inputValues);

    if (isValid) {
      const isSuccessful = login(inputValues);
      if (isSuccessful) {
        history.push('/')
      } else {
        setErrorMessage(state => ({ ...state, general: 'Incorrect username or password.'}))
      }
    } else {
      setErrorMessage(errors);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput(state => ({ ...state, [name]: value }));
  }

  return (
    <Wrapper>
      <h1 style={{ margin: 0, color: '#122330' }}>Impact</h1>
      {errorMessages.general ? <span style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#ca2c37' }}>{errorMessages.general}</span> : null}
      <form onSubmit={handleSubmit} style={{ width: '20rem', padding: '1rem', borderRadius: '0.4rem', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,.08)', marginTop: '1rem' }}>
        <div style={{ marginBottom: '0.8rem' }}>
          <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#4d5868' }}>Username</h5>
          <Input
            name="username"
            onChange={handleInputChange}
            autoComplete="off"
            value={inputValues.name}
            hasError={!!errorMessages.username}
            required
          />
          {errorMessages.username ? <span style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: '#ca2c37' }}>{errorMessages.username}</span> : null}
        </div>
        <div style={{ marginBottom: '0.8rem' }}>
          <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#4d5868' }}>Password</h5>
          <Input
            name="password"
            onChange={handleInputChange}
            type="password"
            autoComplete="off"
            value={inputValues.password}
            hasError={!!errorMessages.password}
            required
          />
          {errorMessages.password ? <span style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: '#ca2c37' }}>{errorMessages.password}</span> : null}
        </div>
        <Button>Submit</Button>
      </form>
    </Wrapper>
  );
}

export default Admin;
