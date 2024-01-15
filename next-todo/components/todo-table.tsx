'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { Todo } from '@/types';

export default function TodoTable({ todo }: { todo: Todo[] }) {
  return (
    <Table aria-label='Example static collection table'>
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>TO-DO</TableColumn>
        <TableColumn>완료여부</TableColumn>
        <TableColumn>생성일</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'작성된 ToDo가 없습니다.'}>
        {todo &&
          todo.map((todo: Todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id.slice(0, 3)}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.isCompleted ? '✔' : ''}</TableCell>
              <TableCell>{`${todo.created_at}`}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
