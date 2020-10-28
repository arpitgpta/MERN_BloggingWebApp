import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth0Provider} from '@auth0/auth0-react'
import App from './App'

const domain = 'dev-jcff9ksn.us.auth0.com'
const clientId = '6K7ywUMWutZ41bvFj9x1IKnFAPv2CRDl'


ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}>
        <App/>
    </Auth0Provider>,
    document.getElementById('root')
);
