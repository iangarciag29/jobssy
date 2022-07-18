import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import {RelayEnvironmentProvider} from "react-relay";
import relayEnvironment from './relay/RelayEnvironment';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RelayEnvironmentProvider environment={relayEnvironment}>
        <React.StrictMode>
            <Suspense fallback={<h1>LOADING...</h1>}>
                <App/>
            </Suspense>
        </React.StrictMode>
    </RelayEnvironmentProvider>
);
