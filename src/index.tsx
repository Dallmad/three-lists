import React from 'react';

import ReactDOM from 'react-dom/client';
import 'Index.module.scss';
import { HashRouter } from 'react-router-dom';

import { App } from 'app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
