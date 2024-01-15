import { title } from '@/components/primitives';
import TodoTable from '@/components/todo-table';

async function fetchTodoApiCall() {
  const url = process.env.BASE_URL + 'todo';
  const res = await fetch(url);

  return res.json();
}

export default async function TodoPage() {
  const response = await fetchTodoApiCall();

  return (
    <div className='flex flex-col space-y-8'>
      <h1 className={title()}>Todo</h1>
      <TodoTable todo={response.data ?? []} />
    </div>
  );
}
