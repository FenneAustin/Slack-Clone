import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css';
import { clearWorkspace } from '../../store/ui';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearWorkspace())
  };

  return <button onClick={onLogout} className="logout-btn">Logout of slack</button>;
};

export default LogoutButton;
