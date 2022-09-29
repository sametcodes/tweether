/// <reference path="./index.d.ts" />

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import ContractContext from './context/Contract';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ContractContext>
    <App />
  </ContractContext>
);
