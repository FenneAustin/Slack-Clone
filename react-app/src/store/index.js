import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import workspace from './workspace'
import channel from './channels'
import chat from "./chat"
import message from "./message"
import ui from "./ui"
import socket from "./socketrooms"
import invitations from "./invitations"
import channelinfo from "./channel"
import workspaceinfo from "./workspaceinfo"

const rootReducer = combineReducers({
  session,
  workspace,
  channel,
  chat,
  message,
  ui,
  socket,
  invitations,
  channelinfo,
  workspaceinfo
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
