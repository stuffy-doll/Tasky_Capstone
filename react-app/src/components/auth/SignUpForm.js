import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './css/signup-form.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password !== repeatPassword) {
      setMessage('Don\'t forget to match your passwords')
    } else {
      setMessage('')
    }
  });

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      } else {
        return <Redirect to='/projects' />
      };
    };
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/projects' />;
  }

  return (
    <div className='signup-form-box'>
      <form className='signup-form' onSubmit={onSignUp}>
        <h2>Sign Up at Tasky</h2>
        <div className='form-errors'>
          <div className='error'>{message}</div>
          {errors.map((error, ind) => (
            <div className='error' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            placeholder='(Required)'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            placeholder='(Required)'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='(Required)'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            name='repeat_password'
            placeholder='(Required)'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='signup-button' type='submit'>Sign Up</button>
        <Link className='to-login' to='/login'>Have an account? Log in!</Link>
      </form>
    </div>
  );
};

export default SignUpForm;
