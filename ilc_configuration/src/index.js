import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MasterDriverProvider } from './context/masterDriverContext'
import { ClusterProvider } from './context/clusterContext'
import CurrentPageProvider from './context/currentPageContext';
import DarkModeProvider from './context/darkModeContext';


ReactDOM.render(
  <React.StrictMode>
    <MasterDriverProvider>
      <ClusterProvider>
        <DarkModeProvider>
          <CurrentPageProvider>
            <App />
          </CurrentPageProvider>
        </DarkModeProvider>
      </ClusterProvider>
    </MasterDriverProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
