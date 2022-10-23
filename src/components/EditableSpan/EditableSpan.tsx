import React, { ChangeEvent, memo, useState } from 'react';

import pencil from 'assets/images/pencil.png';

type EditableSpanPropsType = {
  value: string;
  id: string;
  onChange: (id: string, newValue: string) => void;
  className: string;
};

export const EditableSpan = memo(
  ({ value, onChange, id, className }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditMode = (): void => {
      setEditMode(true);
      setTitle(value);
    };
    const activateViewMode = (): void => {
      setEditMode(false);
      onChange(id, title);
    };
    const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
    };

    return editMode ? (
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <input value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus />
    ) : (
      <li onDoubleClick={activateEditMode} className={className}>
        {value}
        &nbsp;&nbsp;
        <img src={pencil} alt="pencil" style={{ width: '22px' }} />
      </li>
    );
  },
);
