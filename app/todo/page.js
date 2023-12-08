// Import necessary modules and styles
'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../firebase/auth";
import Loader from "../Component/loader";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Page = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todo, setTodo] = useState([]);
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/signIn");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "todo"), {
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
      fetchTodos(authUser.uid);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return !authUser ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Todo Form</h1>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          placeholder="Enter your Todo Here"
          className="w-full md:w-3/4 bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4 md:mb-0"
          required
        />
        <button
          onClick={handleSubmit}
          className="w-full md:w-1/4 bg-blue-500 text-white py-2 px-4 rounded-md text-sm md:ml-2.5  md:mt-6 mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
        >
          Submit
        </button>
      </div>

      {todo.map((item, index) => {
        return (
          <div key={item.id} className="mt-4 flex items-center justify-between">
            <input
              type="text"
              value={item.content}
              readOnly
              className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
            />
            <button
              onClick={() => onDeleteHandler(item.id)}
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
            >
              Delete
            </button>
          </div>
        );
      })}
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
