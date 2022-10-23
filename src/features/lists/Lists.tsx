import React, { ChangeEvent, memo, useState } from 'react';

import { v1 } from 'uuid';

import { ListsType, ReturnComponentType } from 'common';
import { FIRST_LIST, LISTS_TITLE, SECOND_LIST, THIRD_LIST } from 'constants/index';
import { List } from 'features/lists/list/List';
import style from 'features/lists/Lists.module.scss';

export const Lists = memo((): ReturnComponentType => {
  const [firstList, setFirstList] = useState<ListsType>(FIRST_LIST);
  const [secondList, setSecondList] = useState<ListsType>(SECOND_LIST);
  const [thirdList, setThirdList] = useState<ListsType>(THIRD_LIST);
  const [newTitle, setNewTitle] = useState<string>('');

  const titleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value);
  };

  const addTaskToSecondList = (title: string): void => {
    if (title.trim()) {
      setSecondList(secondList.concat({ id: v1(), title }));
      setNewTitle('');
    }
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

  return (
    <div className={style.container}>
      <div className={style.list}>
        <List
          list={firstList}
          moveTask={moveTasksToSecondList}
          listTitle={LISTS_TITLE[0]}
        />
      </div>

      <div className={style.list}>
        <List
          list={secondList}
          listTitle={LISTS_TITLE[1]}
          moveTask={moveTasksToThirdList}
          deleteTask={deleteTaskHandler}
          changeTitle={onChangeTaskTitle}
        />
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
        <List
          list={thirdList}
          moveTask={moveTasksToFirstList}
          listTitle={LISTS_TITLE[2]}
        />
      </div>
    </div>
  );
});
