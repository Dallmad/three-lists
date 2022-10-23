import React, { ChangeEvent, memo, useState } from 'react';

import { v1 } from 'uuid';

import style from './Lists.module.scss';

import { ReturnComponentType } from 'common';
import { EditableSpan } from 'components';
import { FIRST_LIST, SECOND_LIST, THIRD_LIST, ListsType, ListType } from 'enums';

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

  const moveTaskToSecondList = (task: ListType): void => {
    setSecondList(secondList.concat(task));
    setFirstList(firstList.filter(list => list.id !== task.id));
  };
  const moveTaskToThirdList = (task: ListType): void => {
    setThirdList(thirdList.concat(task));
    setSecondList(secondList.filter(list => list.id !== task.id));
  };
  const moveTaskToFirstList = (task: ListType): void => {
    setFirstList(firstList.concat(task));
    setThirdList(thirdList.filter(list => list.id !== task.id));
  };
  const moveFirstListToSecondList = (list: ListsType): void => {
    setSecondList(secondList.concat(list));
    setFirstList([]);
  };
  const moveSecondListToThirdList = (list: ListsType): void => {
    setThirdList(thirdList.concat(list));
    setSecondList([]);
  };
  const moveThirdListToFirstList = (list: ListsType): void => {
    setFirstList(firstList.concat(list));
    setThirdList([]);
  };
  const deleteTaskHandler = (id: string): void => {
    setSecondList(secondList.filter(list => list.id !== id));
  };
  const onChangeTaskTitle = (id: string, newTitle: string): void => {
    setSecondList(
      secondList.map(list => (list.id === id ? { ...list, title: newTitle } : list)),
    );
  };

  return (
    <div className={style.container}>
      <div className={style.list}>
        <h4>List 1</h4>
        <button
          title="Move to second list"
          type="button"
          onClick={() => moveFirstListToSecondList(firstList)}
        >
          &gt;&gt;
        </button>
        {firstList.map(l => (
          <div key={l.id} className={style.tasks}>
            <li className={style.task}>{l.title}</li>
            <button
              title="Move to second list"
              type="button"
              onClick={() => moveTaskToSecondList(l)}
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
          onClick={() => moveSecondListToThirdList(secondList)}
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
              onClick={() => moveTaskToThirdList(l)}
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
          onClick={() => moveThirdListToFirstList(thirdList)}
        >
          &gt;&gt;
        </button>
        {thirdList.map(l => (
          <div key={l.id} className={style.tasks}>
            <li className={style.task}>{l.title}</li>
            <button
              title="Move to first list"
              type="button"
              onClick={() => moveTaskToFirstList(l)}
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
