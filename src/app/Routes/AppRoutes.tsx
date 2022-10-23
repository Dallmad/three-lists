import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { ReturnComponentType } from 'common';
import { PATH } from 'enums';
import { Error404, Lists } from 'features';

export const AppRoutes: FC = (): ReturnComponentType => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={PATH.LISTS} />} />
        <Route path={`${PATH.LISTS}`} element={<Lists />} />
        <Route path={`${PATH.ERROR404}`} element={<Error404 />} />
        <Route path={`${PATH.ANOTHER}`} element={<Navigate to={PATH.ERROR404} />} />
      </Routes>
    </div>
  );
};
