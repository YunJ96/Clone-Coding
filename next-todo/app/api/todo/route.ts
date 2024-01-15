import { NextRequest, NextResponse } from 'next/server';
import { fetchTodo, addTodo } from '@/data/firestore';

//모든 todo 가져오기
export async function GET(request: NextRequest) {
  const fetchedTodo = await fetchTodo();
  const response = {
    message: 'todo 가져오기.',
    data: fetchedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

//todo 추가
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  if (title === undefined) {
    const errorMessage = {
      message: 'todo를 작성해주세요.',
    };
    return NextResponse.json(errorMessage, { status: 422 });
  }

  const newTodo = await addTodo({ title });

  const response = {
    message: 'todo 추가 성공!',
    data: newTodo,
  };
  return NextResponse.json(response, { status: 201 });
}
