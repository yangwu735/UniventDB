import React from "react";
import ReactDOM from "react-dom";

import './index.css';
import App from './App';
import { ContextProvider } from "./contexts/ContextProvider";

//import { firebase, fieldValue } from './lib/firebase';

ReactDOM.render(
    <ContextProvider 
    //value={{firebase, fieldValue}}
    >
        <App />
    </ContextProvider>,
    document.getElementById('root')
);