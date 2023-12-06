"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Page = () => {
  const [formData, setFormData] = useState({
    userName: "",
    lastName: "",
    subject: "",
  });

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "students"), {
        student: formData,
      });

      console.log("Document written with ID: ", docRef.id);

      // Clear form data after successful submission
      setFormData({
        userName: "",
        lastName: "",
        subject: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h1>Todo form</h1>
      <form>
        <input
          type="text"
          onChange={(e) => handleInputChange(e, "userName")}
          value={formData.userName}
          placeholder="Enter your first name"
          className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
        />
        <input
          type="text"
          onChange={(e) => handleInputChange(e, "lastName")}
          value={formData.lastName}
          placeholder="Enter your last name"
          className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
        />
        <input
          type="subject"
          onChange={(e) => handleInputChange(e, "subject")}
          value={formData.subject}
          placeholder="Enter your subject"
          className='bg-gray-50 border m-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required'
          // ... rest of the input attributes
        />
        <button type="button" onClick={handleSubmit}  className="border bg-gray-50 border-gray-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
