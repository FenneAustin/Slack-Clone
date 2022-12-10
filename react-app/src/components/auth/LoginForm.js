import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"

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
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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
        <h1 className="sign-in-header">Sign in to Slack</h1>
      </div>
      <form onSubmit={onLogin}>
        <div className="errors-list">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="email-input-container">
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            className="email-input"
          />
        </div>
        <div className="password-input-container">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            className="password-input"
          />
        </div>
        <div className="btn-container-sign-in">
          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
