export type EditableSpanPropsType = {
  value: string;
  id: string;
  onChange: (id: string, newValue: string) => void;
  className: string;
};
