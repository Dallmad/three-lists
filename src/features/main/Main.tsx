import React from 'react';

import { ReturnComponentType } from 'common';
import { Lists } from 'features/main/lists/Lists';

export const Main = (): ReturnComponentType => {
  return (
    <div>
      Main
      <Lists />
    </div>
  );
};
