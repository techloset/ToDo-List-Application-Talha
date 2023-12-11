"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./firebase/auth";
// import Loader from "./Component/loader";
import { db } from "./firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const Page = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todo, setTodo] = useState([]);
  const { authUser, isLoading, signOut } = useAuth();
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
        // If editing, update the existing todo
        await updateDoc(doc(db, "todo", editingTodoId), {
          content: todoInput,
        });
        setEditingTodoId(null);
      } else {
        // If not editing, add a new todo
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
          {editingTodoId ? "Update" : "Submit"}
        </button>
      </div>

      {todo.map((item, index) => {
        return (
          <div
            key={item.id}
            className="mt-4 flex items-center  justify-between gap-2"
          >
            <div className="flex  items-center justify-between w-[100%]">
              <input
                type="text"
                value={item.content}
                readOnly
                className="w-full  bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
              />
              {editingTodoId !== item.id && (
                <button
                  onClick={() => onEditHandler(item.id)}
                  className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-red-300"
                >
                  Edit
                </button>
              )}
            </div>
            <div>
              {editingTodoId !== item.id && (
                <button
                  onClick={() => onDeleteHandler(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-red-300"
                >
                  Delete
                </button>
              )}
            </div>
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
