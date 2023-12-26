// Import necessary modules and styles
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Changed from next/navigation
import { useAuth } from "./firebase/auth";
import Loader from "./component/Loader";
import { db } from "./firebase/config";
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

const Page = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoInputs, setTodoInputs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [todo, setTodo] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null); // New state for tracking editing todo
  const { authUser, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/logIn");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);

  const handleSubmit = async () => {
    try {
      if (!editingTodoId && todoInput.trim() === "") {
        // Show an error message or handle it as needed
        setErrorMessage("Todo input cannot be empty.");
        return;
      }

      if (editingTodoId) {
        // If editing, update the existing todo
        await updateDoc(doc(db, "todo", editingTodoId), {
          content: todoInputs,
        });
        setEditingTodoId(null); // Reset editing state after updating
      } else {
        // If not editing, add a new todo
        await addDoc(collection(db, "todo"), {
          content: todoInput,
          owner: authUser.uid,
        });
      }

      fetchTodos(authUser.uid);
      setTodoInput("");
    } catch (e) {
      console.error("Error adding/editing document: ", e);
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
      fetchTodos(authUser.uid);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const onEditHandler = (docId) => {
    // Set the editingTodoId when user clicks on the Edit button
    setEditingTodoId(docId);

    // Fetch the existing todo content and set it in the input field
    const editingTodo = todo.find((item) => item.id === docId);
    if (editingTodo) {
      setTodoInputs(editingTodo.content);
    }
  };

  const onCancelEditHandler = () => {
    // Reset the editingTodoId and clear the input field
    setEditingTodoId(null);
    setTodoInput("");
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
        />
        <button
          onClick={handleSubmit}
          className="w-full md:w-1/4 bg-blue-500 text-white py-2 px-4 rounded-md text-sm md:ml-2.5  md:mt-6 mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
        >
          Submit
        </button>
      </div>

      {todo.map((item) => (
        <div key={item.id} className="mt-4 flex items-center justify-between">
          {editingTodoId === item.id ? (
            <div className="w-full flex items-center justify-between">
              <input
                type="text"
                value={todoInputs}
                onChange={(e) => setTodoInputs(e.target.value)}
                className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 "
              />
              <button
                onClick={handleSubmit}
                className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
              >
                Update
              </button>
              <button
                onClick={onCancelEditHandler}
                className="focus:outline-none text-white bg-gray-500 hover:bg-gray-600 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={item.content}
                readOnly
                className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
              />
              <button
                onClick={() => onEditHandler(item.id)}
                className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteHandler(item.id)}
                className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
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
