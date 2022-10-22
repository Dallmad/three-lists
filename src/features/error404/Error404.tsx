import React from 'react';

import { ReturnComponentType } from 'common';
import { ERROR404, PAGE_NOT_FOUND } from 'constants/index';

export const Error404 = (): ReturnComponentType => {
  return (
    <div>
      {ERROR404}
      {'\u00A0'}
      {PAGE_NOT_FOUND}
    </div>
  );
};
