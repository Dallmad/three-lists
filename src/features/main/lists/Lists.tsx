import React, { ChangeEvent, useState } from 'react';

import { v1 } from 'uuid';

import style from './Lists.module.scss';

import { ReturnComponentType } from 'common';
import { FIRST_LIST, SECOND_LIST, THIRD_LIST } from 'enums';
import { ListsType, ListType } from 'enums/Lists';

export const Lists = (): ReturnComponentType => {
  const [firstList, setFirstList] = useState<ListsType>(FIRST_LIST);
  const [secondList, setSecondList] = useState<ListsType>(SECOND_LIST);
  const [thirdList, setThirdList] = useState<ListsType>(THIRD_LIST);
  const [newTitle, setNewTitle] = useState('');

  const titleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value);
  };

  const addTaskToSecondList = (title: string): void => {
    const newTask = { id: v1(), title };

    setSecondList(secondList.concat(newTask));
    setNewTitle('');
  };

  console.log(`firstList:${firstList}`);
  console.log(addTaskToSecondList);

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

  return (
    <div className={style.container}>
      <div className={style.list}>
        List 1
        <button
          title="Move to second list"
          type="button"
          onClick={() => moveFirstListToSecondList(firstList)}
        >
          &gt;&gt;
        </button>
        {firstList.map(l => (
          <div key={l.title} className={style.tasks}>
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
        List 2
        <button
          title="Move to third list"
          type="button"
          onClick={() => moveSecondListToThirdList(secondList)}
        >
          &gt;&gt;
        </button>
        {secondList.map(l => (
          <div key={l.title} className={style.tasks}>
            <li className={style.task}>{l.title}</li>
            <button
              title="Move to third list"
              type="button"
              onClick={() => moveTaskToThirdList(l)}
              className={style.move}
            >
              &gt;
            </button>
            <button type="button" onClick={() => {}} className={style.move}>
              Edit
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
        List 3
        <button
          title="Move to first list"
          type="button"
          onClick={() => moveThirdListToFirstList(thirdList)}
        >
          &gt;&gt;
        </button>
        {thirdList.map(l => (
          <div key={l.title} className={style.tasks}>
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
};
