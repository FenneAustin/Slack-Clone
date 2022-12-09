import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './pages/splashpage/SplashPage'
import Home from "./pages/home/index"
import { getAllUserWorkspaces } from './store/workspace';
import NoWorkspaceLandingPage from './components/noworkspacelandingpage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const curr = useSelector((state) => state.session.user);
  const workspace = useSelector((state) => state.workspace);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
      if (curr) {
        dispatch(getAllUserWorkspaces());
      }
  }, [curr, dispatch]);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      {loaded && curr ?
      (
        Object.values(workspace).length > 0 ?
        (
        <>
          <Route path="/">
            <Home />
          </Route>
        </>
      ): (
        <>
          <Route path="/">
            <NoWorkspaceLandingPage />
          </Route>
        </>
      )

      )
      :
      (
        <Route path="/">
          <SplashPage />
        </Route>
      )}
    </BrowserRouter>
  );
}

export default App;
