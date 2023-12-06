"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase/config";

export default function Home() {
  const [todoStudent, setTodoStudent] = useState([]);

  const getDoc = async () => {
    try {
      const collectionName = collection(db, "students");

      // const querryDoc = query(collectionName, where("email", "==", "todo"));
      // console.log("querry doc", querryDoc);
      const getAllStudents = await getDocs(collectionName);

      const studentsData = [];
      getAllStudents.forEach((doc) => {
        studentsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTodoStudent(studentsData);
      // console.log("studentsDataArray", studentsData);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (id) => {
    const DeleteDoc = doc(db, "students", id);
    await deleteDoc(DeleteDoc);
    getDoc();
    // console.log("id", id);
  };

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <div className="">
      <h1>list of tod0</h1>

      <table>
        <tr className="">
          <td className="">Name</td>
          <td>LastsName</td>
          <td>Email</td>
          <td>Delete</td>
        </tr>

        {todoStudent.length === 0 ? (
          <p>No data available</p>
        ) : (
          todoStudent.map((student, item) => {
            // console.log("student", student);
            return (
              <tr key={student.item}>
                {/* <td>{student.id}</td> */}
                <td>{student.student.name}</td>
                <td>{student.student.email}</td>
                <td>{student.student.subject}</td>
                <td>
                  <button
                    onClick={() => onDeleteHandler(student.id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800  focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </table>
    </div>
  );
}
