'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '@/components/icons';
import { CustomModalType, FocusedTodoType, Todo } from '@/types';
import { useRouter } from 'next/navigation';
import CustomModal from './custom-modal';

export default function TodoTable({ todo }: { todo: Todo[] }) {
  const [newTodoInput, setNewTodoInput] = useState('');
  const [todoAddEnable, setTodoAddEnable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: 'detail' as CustomModalType,
  });
  const router = useRouter();

  const DisabledTodoAddBtn = () => {
    return (
      <Popover placement='top' showArrow={true}>
        <PopoverTrigger>
          <Button className='h-14' color='default'>
            추가
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='px-1 py-2'>
            <div className='text-small font-bold'>⛔</div>
            <div className='text-tiny'>할일을 입력해주세요!</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const applyIsDoneUI = (isCompleted: boolean) =>
    isCompleted ? 'line-through text-gray900/50 dark: text-white-900/50' : '';

  const TodoRow = (todo: Todo) => {
    return (
      <TableRow key={todo.id}>
        <TableCell className={applyIsDoneUI(todo.isCompleted)}>
          {todo.id.slice(0, 3)}
        </TableCell>
        <TableCell className={applyIsDoneUI(todo.isCompleted)}>
          {todo.title}
        </TableCell>
        <TableCell>{todo.isCompleted ? '✔' : ''}</TableCell>
        <TableCell
          className={applyIsDoneUI(todo.isCompleted)}
        >{`${todo.created_at}`}</TableCell>
        <TableCell>
          <div className='relative flex justify-end items-center gap-2'>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  setCurrentModal({
                    focusedTodo: todo,
                    modalType: key as CustomModalType,
                  });
                  onOpen();
                }}
              >
                <DropdownItem key='detail'>상세보기</DropdownItem>
                <DropdownItem key='update'>수정</DropdownItem>
                <DropdownItem key='delete'>삭제</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const notify = (message: string) => toast.success(message);

  const addATodoHandler = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + 'todo';

    if (newTodoInput.length < 1) {
      console.log('글자를 입력하세요.');
      return;
    }

    setTodoAddEnable(false);
    setIsLoading(true);
    await new Promise((f) => setTimeout(f, 600));
    await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        title: newTodoInput,
      }),
      cache: 'no-store',
    });

    setNewTodoInput('');
    router.refresh();
    setIsLoading(false);
    notify('할 일을 추가하였습니다.');
    console.log('할일 추가완료', newTodoInput);
  };

  const updateATodoHandler = async (
    id: string,
    title: string,
    isCompleted: boolean
  ) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `todo/${id}`;

    await new Promise((f) => setTimeout(f, 600));
    await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        title: title,
        isCompleted: isCompleted,
      }),
      cache: 'no-store',
    });

    router.refresh();
    notify('할 일을 수정하였습니다.');
    console.log('할일 수정완료', title);
  };

  const deleteATodoHandler = async (id: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `todo/${id}`;

    await new Promise((f) => setTimeout(f, 600));
    await fetch(url, {
      method: 'delete',
      cache: 'no-store',
    });

    router.refresh();
    notify('할 일을 삭제하였습니다.');
    console.log('할일 삭제 완료');
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ModalComponent = () => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) =>
            currentModal.focusedTodo && (
              <CustomModal
                focusedTodo={currentModal.focusedTodo}
                modalType={currentModal.modalType}
                onClose={onClose}
                onUpdate={async (id, title, isCompleted) => {
                  await updateATodoHandler(id, title, isCompleted);
                  onClose();
                }}
                onDelete={async (id) => {
                  await deleteATodoHandler(id);
                  onClose();
                }}
              />
            )
          }
        </ModalContent>
      </Modal>
    );
  };
  return (
    <div className='flex flex-col space-y-2'>
      <ModalComponent />
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
        <Input
          type='text'
          label='새로운 할일'
          value={newTodoInput}
          onValueChange={(e) => {
            setNewTodoInput(e);
            setTodoAddEnable(e.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button
            className='h-14'
            color='warning'
            onPress={async () => {
              await addATodoHandler();
            }}
          >
            추가
          </Button>
        ) : (
          DisabledTodoAddBtn()
        )}
      </div>
      <div className='h-6'>
        {isLoading && <Spinner size='sm' color='warning' />}
      </div>

      <Table aria-label='Example static collection table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TO-DO</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'작성된 ToDo가 없습니다.'}>
          {todo && todo.map((todo: Todo) => TodoRow(todo))}
        </TableBody>
      </Table>
    </div>
  );
}
