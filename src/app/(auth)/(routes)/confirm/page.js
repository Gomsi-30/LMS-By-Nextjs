"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Confirm = () => {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [ans, setAns] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/role", { role });
      console.log(res.data.role);
      setAns(res.data.role);

      // Handle success response
    } catch (e) {
      console.log(e);
      // Handle error response
    }
  };

  if (ans.role === "student") {
    router.push("/");
  }
  if (ans.role === "teacher") {
    router.push("/teacher/courses");
  }

{/* <div className="dropdown-container">
        <label htmlFor="role-dropdown" className="dropdown-label">Select Role:</label>
        <select
          id="role-dropdown"
          className="dropdown-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>Select a role</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button> */}

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="dropdown-container bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
          <label
            for="role-dropdown"
            className="dropdown-label block text-lg font-medium text-gray-700 mb-2"
          >
            Select Role:
          </label>
          <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
            id="role-dropdown"
            className="dropdown-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled selected>
              Select a role
            </option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <button
            onClick={handleSubmit}
            className="submit-button mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirm;
