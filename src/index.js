import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { jwtRequestHeader } from './Login';
import 'bulma/css/bulma.min.css';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports)

Amplify.configure({
  API: {
    graphql_headers: jwtRequestHeader
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
