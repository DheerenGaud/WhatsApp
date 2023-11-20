import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId="698178007536-2r1ob4k3ivstdicobae7q38h88s4h859.apps.googleusercontent.com"
root.render(
    <GoogleOAuthProvider clientId={clientId}>
     <Provider store={store}>
      <BrowserRouter>
     <App />
      </BrowserRouter>
   </Provider>
    </GoogleOAuthProvider>
);

