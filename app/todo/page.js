"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const page = () => {
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  // const [isDataAdded, setIsDataAdded] = useState(false);

  const handleSubmit = async () => {
    let student = {
      name: userName,
      lastName,
      subject,
    };

    try {
      const docRef = await addDoc(collection(db, "students"), {
        student,
      });

      // console.log("Document written with ID: ", docRef.id);
      setUserName("");
      setLastName("");
      setSubject("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div>
      <h1>Todo form</h1>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        placeholder="enter your first name"
        className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
      />

      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        placeholder="enter your last name"
        className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
      />

      {/* <h1>{lastName}</h1> */}
      <input
        type="subject"
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
        placeholder="enter your subject"
        className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
      />
      <button
        onClick={handleSubmit}
        className="border bg-gray-50 border-gray-300"
      >
        Submit
      </button>
    </div>
  );
};

export default page;
