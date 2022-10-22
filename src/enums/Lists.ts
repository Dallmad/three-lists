import { v1 } from 'uuid';

export const FIRST_LIST: ListsType = [
  { id: v1(), title: 'sag1' },
  { id: v1(), title: 'sdgs1' },
  { id: v1(), title: 'wre1' },
];
export const SECOND_LIST: ListsType = [
  { id: v1(), title: 'sag2' },
  { id: v1(), title: 'sdgs2' },
  { id: v1(), title: 'wre2' },
];
export const THIRD_LIST: ListsType = [
  { id: v1(), title: 'sag3' },
  { id: v1(), title: 'sdgs3' },
  { id: v1(), title: 'wre3' },
];

export type ListType = {
  id: string;
  title: string;
};
export type ListsType = ListType[];
