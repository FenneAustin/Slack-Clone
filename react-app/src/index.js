import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from "./context/Modal";
import { SmallModalProvider } from "./context/smallModal";
import { SocketContext, socket} from "./context/socket";


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <SmallModalProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </SmallModalProvider>
      </Provider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
