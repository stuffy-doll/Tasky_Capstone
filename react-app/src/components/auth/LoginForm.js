import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './css/login-form.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      return <Redirect to='/projects' />
    };
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/projects' />;
  }

  return (
    <div className="login-form-view">
      <div className="tasky-brief">
        <img src="https://i.imgur.com/iPeB24a.png" alt="tasky logo" />
        <p className="tasky-description">Tasky is a clone of Todoist created by Luis Sanchez-Porras. Tasky lets users create projects and manage tasks within those projects.</p>
      </div>
      <form className="login-form" onSubmit={onLogin}>
        <h2 className='login-header'>Login to Tasky</h2>
        <div className="form-errors">
          {errors.map((error, ind) => (
            <div className="error" key={ind}>{error}</div>
          ))}
        </div>
        <div className="login-inputs">
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="login-button" type='submit'>Login</button>
        <Link className="to-signup" to="/sign-up" >New Here? Sign Up!</Link>
      </form>
    </div>
  );
};

export default LoginForm;
