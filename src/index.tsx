/// <reference path="./index.d.ts" />

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import ContractContext from './context/Contract';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <ContractContext>
      <App />
    </ContractContext>
  </Router>
);
