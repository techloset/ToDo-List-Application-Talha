// Page.js
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./firebase/auth";
import Loader from "./Component/loader";
import { db } from "./firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import TodoForm from "./Component/TodoForm";
import TodoList from "./Component/TodoList";

const Page = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todo, setTodo] = useState([]);
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();

  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/signnIn");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);

  const handleSubmit = async () => {
    try {
      if (editMode !== null) {
        await updateDoc(doc(db, "todo", todo[editMode].id), {
          content: todoInput,
        });
        setEditMode(null);
      } else {
        const docRef = await addDoc(collection(db, "todo"), {
          content: todoInput,
          owner: authUser.uid,
          completed: false,
        });
        console.log("user todo id ", docRef.id);
      }

      fetchTodos(authUser.uid);
      setTodoInput("");
    } catch (e) {
      console.error("Error updating/adding document: ", e);
    }
  };

  const fetchTodos = async (uid) => {
    try {
      const q = query(collection(db, "todo"), where("owner", "==", uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        console.log("user id ???", doc.id, " => ", doc.data());
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
      fetchTodos(authUser.uid);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const onEditHandler = (index) => {
    setEditMode(index);
    setTodoInput(todo[index].content);
  };
  return !authUser ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Todo Form</h1>
      <TodoForm
        onSubmit={handleSubmit}
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        editMode={editMode}
      />
      <TodoList
        todo={todo}
        editMode={editMode}
        onDeleteHandler={onDeleteHandler}
        onEditHandler={onEditHandler}
        setTodoInput={setTodoInput}
        handleSubmit={handleSubmit}
      />
      <button
        onClick={signOut}
        className="border border-gray-300 py-2 px-4 mt-4 text-gray-800 rounded-md text-sm"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Page;
