import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import awsconfig from './amplifyconfiguration.json';

Amplify.configure(awsconfig);


ReactDOM.createRoot(document.getElementById("root")!).render(
   
  <React.StrictMode>
    <Authenticator signUpAttributes={[]} hideSignUp={true}>
      <App />
    </Authenticator>
  </React.StrictMode>
);
