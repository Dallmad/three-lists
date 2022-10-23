import React, { memo } from 'react';

import { ListPropsType } from './types';

import { ReturnComponentType } from 'common';
import { EditableSpan } from 'components';
import { LISTS_TITLE } from 'enums';
import style from 'features/lists/Lists.module.scss';

export const List = memo(
  ({
    list,
    listTitle,
    moveTask,
    deleteTask,
    changeTitle,
  }: ListPropsType): ReturnComponentType => {
    return (
      <>
        <h4>{listTitle}</h4>
        <button title="Move to next list" type="button" onClick={() => moveTask(list)}>
          &gt;&gt;
        </button>
        {list.map(l => (
          <div key={l.id} className={style.tasks}>
            {listTitle === LISTS_TITLE[1] ? (
              <EditableSpan
                value={l.title}
                onChange={changeTitle as () => void}
                id={l.id}
                className={style.task}
              />
            ) : (
              <li className={style.task}>{l.title}</li>
            )}
            <button
              title="Move to next list"
              type="button"
              onClick={() => moveTask(Array(l))}
              className={style.move}
            >
              &gt;
            </button>
            {deleteTask && (
              <button
                type="button"
                onClick={() => deleteTask(l.id)}
                className={style.move}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </>
    );
  },
);
