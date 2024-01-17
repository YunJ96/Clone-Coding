import { CustomModalType, Todo } from '@/types';
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  ModalContent,
  Switch,
  CircularProgress,
} from '@nextui-org/react';
import { useState } from 'react';

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
  onUpdate,
  onDelete,
}: {
  focusedTodo: Todo;
  modalType: CustomModalType;
  onClose: () => void;
  onUpdate: (id: string, title: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  const [isDone, setIsDone] = useState<boolean>(focusedTodo.isCompleted);
  const [updateTodoInput, setUpdateTodoInput] = useState<string>(
    focusedTodo.title
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getModal = (type: CustomModalType) => {
    switch (type) {
      case 'detail':
        return DetailModal();
      case 'update':
        return UpdateModal();
      case 'delete':
        return DeleteModal();
      default:
        break;
    }
  };

  const DetailModal = () => {
    return (
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>할일 상세</ModalHeader>
            <ModalBody>
              <p>
                <span className='font-bold'>id : </span>
                {focusedTodo.id}
              </p>
              <p>
                <span>할일 내용: </span>
                {updateTodoInput}
                {isDone ? '✔' : ''}
              </p>

              <div className='flex py-2 space-x-4'>
                <span className='font-bold'>완료 여부 : </span>
                {focusedTodo.isCompleted ? '완료' : '미완료'}
              </div>
              <div className='flex py-1 space-x-4'>
                <span className='font-bold'>작성일 : </span>
                <p>{`${focusedTodo.created_at}`}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='default' onPress={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    );
  };
  const UpdateModal = () => {
    return (
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>할일 수정</ModalHeader>
            <ModalBody>
              <p>
                <span className='font-bold'>id : </span>
                {focusedTodo.id}
              </p>
              <p>
                <span>입력된 할일 : </span>
                {updateTodoInput}
                {isDone ? '✔' : ''}
              </p>
              <Input
                isRequired
                autoFocus
                label='내용'
                placeholder='할일을 입력해주세요.'
                variant='bordered'
                defaultValue={focusedTodo.title}
                value={updateTodoInput}
                onValueChange={setUpdateTodoInput}
              />

              <div className='flex py-2 space-x-4'>
                <span className='font-bold'>완료 여부 : </span>
                <Switch
                  defaultSelected={focusedTodo.isCompleted}
                  onValueChange={setIsDone}
                  aria-label='Automatic updates'
                ></Switch>
              </div>
              <div className='flex py-1 space-x-4'>
                <span className='font-bold'>작성일 : </span>
                <p>{`${focusedTodo.created_at}`}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color='primary'
                variant='flat'
                onPress={() => {
                  setIsLoading(true);
                  onUpdate(focusedTodo.id, updateTodoInput, isDone);
                }}
              >
                {isLoading ? (
                  <CircularProgress
                    color='primary'
                    size='sm'
                    aria-label='Loading...'
                  />
                ) : (
                  '수정'
                )}
              </Button>
              <Button color='default' onPress={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    );
  };
  const DeleteModal = () => {
    return (
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>할일 삭제</ModalHeader>
            <ModalBody>
              <p>
                <span className='font-bold'>id : </span>
                {focusedTodo.id}
              </p>
              <p>
                <span>할일 내용: </span>
                {updateTodoInput}
                {isDone ? '✔' : ''}
              </p>

              <div className='flex py-2 space-x-4'>
                <span className='font-bold'>완료 여부 : </span>
                {focusedTodo.isCompleted ? '완료' : '미완료'}
              </div>
              <div className='flex py-1 space-x-4'>
                <span className='font-bold'>작성일 : </span>
                <p>{`${focusedTodo.created_at}`}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={() => {
                  setIsLoading(true);
                  onDelete(focusedTodo.id);
                }}
              >
                {isLoading ? (
                  <CircularProgress
                    color='primary'
                    size='sm'
                    aria-label='Loading...'
                  />
                ) : (
                  '삭제'
                )}
              </Button>
              <Button color='default' onPress={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    );
  };
  return <>{getModal(modalType)}</>;
};

export default CustomModal;
