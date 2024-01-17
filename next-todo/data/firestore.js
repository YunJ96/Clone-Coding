// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//모든 todo 가져오기
export async function fetchTodo() {
  const todoRef = collection(db, 'todo');
  const q = query(todoRef, orderBy('created_at', 'desc'));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const fetchedTodo = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());

    const getTodo = {
      id: doc.id,
      title: doc.data()['title'],
      isCompleted: doc.data()['isCompleted'],
      created_at: doc.data()['created_at'].toDate(),
      //.toLocaleTimeString('ko')
    };
    fetchedTodo.push(getTodo);
  });
  return fetchedTodo;
}

//todo 추가
export async function addTodo({ title }) {
  // Add a new document with a generated id
  const newTodoRef = doc(collection(db, 'todo'));

  const created_at = Timestamp.fromDate(new Date());

  const newTodo = {
    id: newTodoRef.id,
    title: title,
    isCompleted: false,
    created_at: created_at,
  };

  // later...
  await setDoc(newTodoRef, newTodo);
  return {
    id: newTodoRef.id,
    title: title,
    isCompleted: false,
    created_at: created_at.toDate(),
  };
}

//todo 단일 조회
export async function fetchATodo(id) {
  if (id === null) return null;

  const totoDocRef = doc(db, 'todo', id);
  const todoDocSnap = await getDoc(totoDocRef);

  if (todoDocSnap.exists()) {
    console.log('Document data:', todoDocSnap.data());

    const fetchedTodo = {
      id: todoDocSnap.id,
      title: todoDocSnap.data()['title'],
      isCompleted: todoDocSnap.data()['isCompleted'],
      created_at: todoDocSnap.data()['created_at'].toDate(),
      //.toLocaleTimeString('ko')
    };
    return fetchedTodo;
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }
}

//todo 단일 수정
export async function modifyATodo(id, { title, isCompleted }) {
  const fetchedTodo = await fetchATodo(id);

  if (fetchedTodo === null) {
    return null;
  }

  const todoRef = doc(db, 'todo', id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(todoRef, {
    title: title,
    isCompleted: isCompleted,
  });

  return {
    id: id,
    title: title,
    isCompleted: isCompleted,
    created_at: fetchTodo.created_at,
  };
}

//todo 단일 삭제
export async function deleteATodo(id) {
  const fetchedTodo = await fetchATodo(id);

  if (fetchedTodo === null) {
    return null;
  }

  await deleteDoc(doc(db, 'todo', id));
  return fetchedTodo;
}

module.exports = { fetchTodo, addTodo, fetchATodo, deleteATodo, modifyATodo };
