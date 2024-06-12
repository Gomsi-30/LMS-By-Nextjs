"use client";

import axios from "axios";
// import { auth } from "@/auth";
import {Categories} from "./_components/categories"
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export async function loader() {
    const res = await axios.get("/api/category");
    return res;  // Ensure you return the data part of the response
}

const CourseCard = ({ course }) => (
    <Link
      className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      href={`/search/${course._id}`}
    >
      <div className="relative h-60 overflow-hidden group-hover:scale-105">
        <Image
          src={course.imageUrl}
          alt={course.title}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>
        {/* <p className="text-gray-800 mt-2">${course.price}</p> */}
      </div>
    </Link>
  );
  

const Search = () => {
    const [courses, setCourses] = useState([]);
    const router = useRouter()
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await fetch('/api/coursesfetch');
          console.log("agya")
          const data = await res.json();
          if (data.success) {
            setCourses(data.data);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
      fetchCourses();
    }, []);

    const [categ, setCateg] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const categoryData = await loader();
          console.log(categoryData.data)        
          setCateg(categoryData.data)
        }
        fetchData();
    },[])

     
  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/signup' });
    router.push('/signup')
  };

    return ( 
        <div>
        {categ ? 
            <Categories data={categ}/> :<p> loading...</p>
        }
    <div className="container mx-auto py-8">
    <button 
      onClick={handleLogout}
      className="ml-[1100px] bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
      <h1 className="text-3xl font-semibold mb-4">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
    </div>
  );
  }

export default Search;