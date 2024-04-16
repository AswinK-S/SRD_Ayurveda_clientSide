import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './store/index.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="519752162949-vji5mr6pt3gob4ms8536nu2i3fets4mu.apps.googleusercontent.com">
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
