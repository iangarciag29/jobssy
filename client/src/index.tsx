import React, {StrictMode, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import {RelayEnvironmentProvider} from "react-relay";
import relayEnvironment from './relay/RelayEnvironment';
import {SidebarProvider} from "./context/SidebarContext";
import {Provider} from "react-redux";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RelayEnvironmentProvider environment={relayEnvironment}>
            <StrictMode>
                <SidebarProvider>
                    <Suspense fallback={<h1>LOADING...</h1>}>
                        <App/>
                    </Suspense>
                </SidebarProvider>
            </StrictMode>
        </RelayEnvironmentProvider>
    </Provider>
);
