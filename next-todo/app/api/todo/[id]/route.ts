import { NextRequest, NextResponse } from 'next/server';
import { fetchATodo, deleteATodo, modifyATodo } from '@/data/firestore';

//todo 단일 조회
export async function GET(
  request: NextRequest,
  //params 가져오기
  { params }: { params: { id: string } }
) {
  //query 가져오기
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('search');

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'

  const fetchedTodo = await fetchATodo(params.id);

  if (fetchedTodo === null) return new Response(null, { status: 204 });

  const response = {
    message: 'todo 하나 가져오기.',
    data: fetchedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

//todo 단일 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deletedTodo = await deleteATodo(params.id);

  if (deletedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: 'todo 삭제 성공',
    data: deletedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}

//todo 단일 수정
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, isCompleted } = await request.json();

  const modifiedTodo = await modifyATodo(params.id, { title, isCompleted });

  if (modifiedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: 'todo 수정 성공',
    data: modifiedTodo,
  };
  return NextResponse.json(response, { status: 200 });
}
