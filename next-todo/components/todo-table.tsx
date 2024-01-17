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
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '@/components/icons';
import { CustomModalType, FocusedTodoType, Todo } from '@/types';
import { useRouter } from 'next/navigation';

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

  const TodoRow = (todo: Todo) => {
    return (
      <TableRow key={todo.id}>
        <TableCell>{todo.id.slice(0, 3)}</TableCell>
        <TableCell>{todo.title}</TableCell>
        <TableCell>{todo.isCompleted ? '✔' : ''}</TableCell>
        <TableCell>{`${todo.created_at}`}</TableCell>
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

  const notify = () => toast.success('새로운 할일이 추가되었습니다.');

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
    notify();
    console.log('할일 추가완료', newTodoInput);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const ModalComponent = () => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
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
