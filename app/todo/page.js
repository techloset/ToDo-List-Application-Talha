"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { useRouter } from "next/navigation";
import { useAuth } from "../firebase/auth";
import Loader from "../Component/loader";
import Link from "next/link";

const page = () => {
  const [todoInput, setTodoInput] = useState("");

  // for docment we fetch
  const [todo, setTodo] = useState([]);
  const { authUser, isLoading, signOut } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/signnIn");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);

  const handleSubmit = async () => {
    // let studentTodo = {
    //   content: todoInput,
    //   owner: authUser.uid,
    // };

    try {
      const docRef = await addDoc(collection(db, "todo"), {
        // studentTodo,
        content: todoInput,
        owner: authUser.uid,
        completed: false,
      });
      console.log("user todo id ", docRef.id);
      fetchTodos(authUser.uid);
      setTodoInput("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchTodos = async (uid) => {
    try {
      const q = query(collection(db, "todo"), where("owner", "==", uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("user id ???", doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id });
        setTodo(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteHandler = async (docId) => {
    try {
      await deleteDoc(doc(db, "todo", docId));
      // After deleting the todo, fetch all todos for the current user and update the state with the new data.
      fetchTodos(authUser.uid);
     
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return !authUser ? (
    <Loader />
  ) : (
    <div>
      <h1>Todo form</h1>
      <input
        type="text"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
        placeholder="Enter your Todo Here"
        className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
      />
      <button
        onClick={handleSubmit}
        className="border bg-gray-50 border-gray-300"
      >
        Submit
      </button>

      {todo.map((item, index) => {
        // console.log("todoooo iddd delete",item.id);
        return (
          <div key={index.id}>
            <h1>{item.content}</h1>
            <button
              onClick={() => onDeleteHandler(item.id)}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800  focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        onClick={signOut}
        className="border bg-gray-50 border-gray-300 ml-3"
      >
        Sign Out
      </button>
    </div>
  );
};

export default page;
