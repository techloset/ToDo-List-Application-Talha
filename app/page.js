"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./firebase/auth";
import { db } from "./firebase/config";

import TodoForm from "./Component/TodoForm";
import TodoList from "./Component/TodoList";

const Page = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todo, setTodo] = useState([]);
  const { authUser, signOut } = useAuth();
  const router = useRouter();
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    if (!authUser) {
      router.push("/logIn");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser]);

  const handleSubmit = async () => {
    try {
      if (todoInput.trim() === "") {
        return;
      }

      if (editingTodoId) {
        await updateDoc(doc(db, "todo", editingTodoId), {
          content: todoInput,
        });
        setEditingTodoId(null);
      } else {
        await addDoc(collection(db, "todo"), {
          content: todoInput,
          owner: authUser.uid,
          completed: false,
        });
      }

      fetchTodos(authUser.uid);
      setTodoInput("");
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  const fetchTodos = async (uid) => {
    try {
      const q = query(collection(db, "todo"), where("owner", "==", uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteHandler = async (docId) => {
    try {
      await deleteDoc(doc(db, "todo", docId));
      setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== docId));
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const onEditHandler = (docId) => {
    const todoToEdit = todo.find((item) => item.id === docId);
    setTodoInput(todoToEdit.content);
    setEditingTodoId(docId);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-700 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-white text-center">
        Todo Application Form
      </h1>

      {/* Use TodoForm component */}
      <TodoForm
        onSubmit={handleSubmit}
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        editingTodoId={editingTodoId}
      />

      <p className="text-3xl font-semibold mb-6 text-white mt-6">
        {authUser ? authUser.username : ""} Todos
      </p>

      {/* Use TodoList component */}
      <TodoList
        todo={todo}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        editingTodoId={editingTodoId}
      />

      <button
        onClick={signOut}
        className="bg-green-500 text-white py-2 px-4 mt-2 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-red-300"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Page;
