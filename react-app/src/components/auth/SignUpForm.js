import React, { useEffect, useState } from 'react';
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

  const [emailErr, setEmailErr] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [repeatPasswordErr, setRepeatPasswordErr] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();

    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

  const onSignUp = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (password === repeatPassword && !emailErr && !firstNameErr && !lastNameErr && !passwordErr && !repeatPasswordErr) {
      const data = await dispatch(signUp(email, firstName, lastName, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    setErrors([])
    setShowErrors(false)
    if (validateEmail(email) == true){
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  }, [email])

  useEffect(() => {
    setErrors([])
    setShowErrors(false)
    setFirstNameErr(false);
    if (firstName.replaceAll(" ", "").length == 0) {
      setFirstNameErr(true);
    }
  }, [firstName])

  useEffect(() => {
      setErrors([])
      setShowErrors(false);
      setLastNameErr(false);
      if (lastName.replaceAll(" ", "").length == 0) {
          setLastNameErr(true);
      }

  }, [lastName])

  useEffect(() => {
    setErrors([])
    setShowErrors(false);
    setPasswordErr(false);
    if (password.replaceAll(" ", "").length == 0) {
      setPasswordErr(true);
    }
  }, [password])

  useEffect(() => {
    setErrors([])
    setShowErrors(false);
    setRepeatPasswordErr(false);
    if (repeatPassword.replaceAll(" ", "").length == 0) {
      setRepeatPasswordErr(true);
    }
    if (repeatPassword !== password) {
      setRepeatPasswordErr(true);
    }
  }, [repeatPassword])



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
        <div className="errors-list">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
          {emailErr && showErrors ? (
            <div className="errors-msg">
              <p>Email must be valid</p>
            </div>
          ) : null}
          {firstNameErr && showErrors ? (
            <div className="errors-msg">
              <p>please enter a first name</p>
            </div>
          ) : null}
          {lastNameErr && showErrors ? (
            <div className="errors-msg">
              <p>please enter a last name</p>
            </div>
          ) : null}
          {passwordErr && showErrors ? (
            <div className="errors-msg">
              <p>please enter a password</p>
            </div>
          ) : null}
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
