import { ListsType } from 'common';

export type ListPropsType = {
  list: ListsType;
  listTitle: string;
  moveTask: (list: ListsType) => void;
  deleteTask?: (id: string) => void;
  changeTitle?: (id: string, newTitle: string) => void;
};
