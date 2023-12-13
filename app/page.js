// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./firebase/auth";
// import { db } from "./firebase/config";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   query,
//   where,
//   updateDoc,
// } from "firebase/firestore";

// const Page = () => {
//   const [todoInput, setTodoInput] = useState("");
//   const [todo, setTodo] = useState([]);
//   const { authUser, signOut } = useAuth();
//   const router = useRouter();
//   const [editingTodoId, setEditingTodoId] = useState(null);

//   useEffect(() => {
//     if (!authUser) {
//       router.push("/logIn");
//     }
//     if (!!authUser) {
//       fetchTodos(authUser.uid);
//     }
//   }, [authUser]);
  

//   const handleSubmit = async () => {
//     try {
//       if (todoInput.trim() === "") {
//         return;
//       }

//       if (editingTodoId) {
//         // If editing, update the existing todo
//         await updateDoc(doc(db, "todo", editingTodoId), {
//           content: todoInput,
//         });
//         setEditingTodoId(null);
//       } else {
//         // If not editing, add a new todo
//         await addDoc(collection(db, "todo"), {
//           content: todoInput,
//           owner: authUser.uid,
//           completed: false,
//         });
//       }

//       fetchTodos(authUser.uid);
//       setTodoInput("");
//     } catch (e) {
//       console.error("Error adding/updating document: ", e);
//     }
//   };

//   const fetchTodos = async (uid) => {
//     try {
//       const q = query(collection(db, "todo"), where("owner", "==", uid));
//       const querySnapshot = await getDocs(q);
//       let data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ ...doc.data(), id: doc.id });
//       });
//       setTodo(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onDeleteHandler = async (docId) => {
//     try {
//       await deleteDoc(doc(db, "todo", docId));
//       setTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== docId));
//     } catch (error) {
//       console.error("An error occurred", error);
//     }
//   };

//   const onEditHandler = (docId) => {
//     const todoToEdit = todo.find((item) => item.id === docId);
//     setTodoInput(todoToEdit.content);
//     setEditingTodoId(docId);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-700 shadow-lg rounded-lg">
//       <h1 className="text-3xl font-semibold mb-6 text-white text-center">
//         Todo Application Form
//       </h1>
//       <div className="flex flex-wrap items-center justify-center">
//         <input
//           type="text"
//           onChange={(e) => setTodoInput(e.target.value)}
//           value={todoInput}
//           placeholder="Enter your Todo Here"
//           className="w-full md:w-3/4 bg-gray-300 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4 md:mb-0"
//           required
//         />
//         <button
//           onClick={handleSubmit}
//           className="w-full md:w-1/4 bg-blue-700 text-white py-2 px-4 rounded-md text-sm md:ml-2.5 md:mt-6 mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-600"
//         >
//           {editingTodoId ? "Update" : "Submit"}
//         </button>
//       </div>
//       <p className="text-3xl font-semibold mb-6 text-white mt-6">
//         {authUser ? authUser.username : ""} Todos
//       </p>

//       {todo.map((item, index) => (
//         <div
//           key={item.id}
//           className="mt-4 flex items-center justify-between gap-2"
//         >
//           <div className="flex items-center justify-between w-[100%]">
//             <input
//               type="text"
//               value={item.content}
//               readOnly
//               className="w-full bg-gray-200 border border-gray-300 text-gray-800 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2"
//             />
//             {editingTodoId !== item.id && (
//               <button
//                 onClick={() => onEditHandler(item.id)}
//                 className="ml-2 bg-blue-700 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-red-300"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//           <div>
//             {editingTodoId !== item.id && (
//               <button
//                 onClick={() => onDeleteHandler(item.id)}
//                 className="bg-red-500 text-white py-2 px-4 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-red-300"
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={signOut}
//         className="bg-green-500 text-white py-2 px-4 mt-2 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-red-300"
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// };

// export default Page;


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./firebase/auth";
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

// Import TodoForm, TodoList, and TodoItem components

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


