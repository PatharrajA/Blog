import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import { store,history } from './services/store';

ReactDOM.render((
    <Provider store={store}>
        <CookiesProvider>
            <Router history={history}>
                <Route path='/' component={App} />
            </Router>
        </CookiesProvider>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
