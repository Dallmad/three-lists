import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import { v1 } from 'uuid';

import style from './Lists.module.scss';

import { ReturnComponentType } from 'common';
import { EditableSpan } from 'components';
import { FIRST_LIST, SECOND_LIST, THIRD_LIST, ListsType } from 'enums';

export const Lists = memo((): ReturnComponentType => {
  const [firstList, setFirstList] = useState<ListsType>(FIRST_LIST);
  const [secondList, setSecondList] = useState<ListsType>(SECOND_LIST);
  const [thirdList, setThirdList] = useState<ListsType>(THIRD_LIST);
  const [newTitle, setNewTitle] = useState<string>('');

  const titleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value);
  };

  const addTaskToSecondList = (title: string): void => {
    const newTask = { id: v1(), title };

    setSecondList(secondList.concat(newTask));
    setNewTitle('');
  };

  const moveTasksToSecondList = (tasks: ListsType): void => {
    setSecondList(secondList.concat(tasks));
    setFirstList(
      firstList.filter(list => list.id && !tasks.map(el => el.id).includes(list.id)),
    );
  };
  const moveTasksToFirstList = (tasks: ListsType): void => {
    setFirstList(firstList.concat(tasks));
    setThirdList(
      thirdList.filter(list => list.id && !tasks.map(el => el.id).includes(list.id)),
    );
  };
  const moveTasksToThirdList = (tasks: ListsType): void => {
    setThirdList(thirdList.concat(tasks));
    setSecondList(
      secondList.filter(list => list.id && !tasks.map(el => el.id).includes(list.id)),
    );
  };

  const deleteTaskHandler = (id: string): void => {
    setSecondList(secondList.filter(list => list.id !== id));
  };
  const onChangeTaskTitle = (id: string, newTitle: string): void => {
    setSecondList(
      secondList.map(list => (list.id === id ? { ...list, title: newTitle } : list)),
    );
  };

  useEffect(() => {}, [firstList, secondList, thirdList]);

  return (
    <div className={style.container}>
      <div className={style.list}>
        <h4>List 1</h4>
        <button
          title="Move to second list"
          type="button"
          onClick={() => moveTasksToSecondList(firstList)}
        >
          &gt;&gt;
        </button>
        {firstList.map(l => (
          <div key={l.id} className={style.tasks}>
            <li className={style.task}>{l.title}</li>
            <button
              title="Move to second list"
              type="button"
              onClick={() => moveTasksToSecondList(Array(l))}
              className={style.move}
            >
              &gt;
            </button>
          </div>
        ))}
      </div>

      <div className={style.list}>
        <h4>List 2</h4>
        <button
          title="Move to third list"
          type="button"
          onClick={() => moveTasksToThirdList(secondList)}
        >
          &gt;&gt;
        </button>
        {secondList.map(l => (
          <div key={l.id} className={style.tasks}>
            <EditableSpan
              value={l.title}
              onChange={onChangeTaskTitle}
              id={l.id}
              className={style.task}
            />
            <button
              title="Move to third list"
              type="button"
              onClick={() => moveTasksToThirdList(Array(l))}
              className={style.move}
            >
              &gt;
            </button>
            <button
              type="button"
              onClick={() => deleteTaskHandler(l.id)}
              className={style.move}
            >
              Delete
            </button>
          </div>
        ))}
        <input
          type="text"
          onChange={e => titleHandler(e)}
          value={newTitle}
          className={style.input}
        />
        <button
          type="button"
          onClick={() => addTaskToSecondList(newTitle)}
          className={style.move}
        >
          Add task
        </button>
      </div>

      <div className={style.list}>
        <h4>List 3</h4>
        <button
          title="Move to first list"
          type="button"
          onClick={() => moveTasksToFirstList(thirdList)}
        >
          &gt;&gt;
        </button>
        {thirdList.map(l => (
          <div key={l.id} className={style.tasks}>
            <li className={style.task}>{l.title}</li>
            <button
              title="Move to first list"
              type="button"
              onClick={() => moveTasksToFirstList(Array(l))}
              className={style.move}
            >
              &gt;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});
