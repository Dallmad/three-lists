import React from 'react';

import { AppRoutes } from 'app/Routes/AppRoutes';
import { ReturnComponentType } from 'common';

export const App = (): ReturnComponentType => {
  return (
    <div>
      Three lists
      <AppRoutes />
    </div>
  );
};
