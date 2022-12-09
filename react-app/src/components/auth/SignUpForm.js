import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp( email,firstName,lastName, password));
      if (data) {
        setErrors(data)
      }
    }
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

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className="slack-logo-container">
        <img
          className="slack-logo-no-workspace"
          src="https://res.cloudinary.com/dugmjvzmx/image/upload/v1670542918/slack_jy6w8x.svg"
          alt="slack logo"
        />
      </div>
      <div className="header-container-sign-in">
        <h1 className="sign-in-header">Sign up to Slack</h1>
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="password-input-container">
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={updateEmail}
            value={email}
            className="email-input"
          ></input>
        </div>
        <div className="password-input-container">
          <input
            type="text"
            name="firstName"
            placeholder="first name"
            onChange={updateFirstName}
            value={firstName}
            className="email-input"
          ></input>
        </div>
        <div className="password-input-container">
          <input
            type="text"
            name="lastName"
            placeholder="last name"
            onChange={updateLastName}
            value={lastName}
            className="email-input"
          ></input>
        </div>
        <div className="password-input-container">
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={updatePassword}
            value={password}
            className="email-input"
          ></input>
        </div>
        <div className="password-input-container">
          <input
            type="password"
            name="repeat_password"
            placeholder="repeat password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className="email-input"
          ></input>
        </div>
        <div className="btn-container-sign-in">
          <button type="submit" className="sign-in-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
