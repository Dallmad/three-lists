import React from 'react';

import style from './App.module.scss';

import { AppRoutes } from 'app/Routes/AppRoutes';
import { ReturnComponentType } from 'common';

export const App = (): ReturnComponentType => {
  return (
    <div className={style.container}>
      <h2>Three lists</h2>
      <AppRoutes />
    </div>
  );
};
