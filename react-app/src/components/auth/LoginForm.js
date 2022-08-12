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
      <form className="login-form" onSubmit={onLogin}>
        <h2 className='login-header'>Login to Tasky</h2>
        <div className="form-errors">
          {errors.map((error, ind) => (
            <div className="error" key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Email</label>
          <input
            name='email'
            type='text'
            placeholder='(Required)'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name='password'
            type='password'
            placeholder='(Required)'
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
