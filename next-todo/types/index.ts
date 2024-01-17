import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  created_at: Date;
};

export type CustomModalType = 'detail' | 'update' | 'delete';

export type FocusedTodoType = {
  focusedTodo: Todo | null;
  modalType: CustomModalType;
};
