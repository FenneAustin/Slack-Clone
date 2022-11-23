import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './pages/splashpage/SplashPage'
import Home from "./pages/home/index"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const curr = useSelector((state) => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {loaded && curr ? (
        <>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/chats/:chatId" exact={true}>
            <Home />
          </Route>
          <Route path="/channels/:channelId" exact={true}>
            <Home />
          </Route>
        </>
      ) : (
        <Route path="/">
          <SplashPage />
        </Route>
      )}
    </BrowserRouter>
  );
}

export default App;
