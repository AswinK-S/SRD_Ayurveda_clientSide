import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import  { store,persistor } from './store/index.jsx';

import './index.css'
import { PersistGate } from 'redux-persist/integration/react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} >
    <ToastContainer />
      <App />
    </PersistGate>
      
    </Provider>
  </React.StrictMode>,
)
