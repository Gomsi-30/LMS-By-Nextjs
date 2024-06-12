"use client";
import axios from "axios";
import { Categories } from "./_components/categories";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    </div>
  </Link>
);

const Search = () => {
  const [courses, setCourses] = useState([]);
  const [categ, setCateg] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCoursesAndCategories = async () => {
      try {
        const [courseRes, categoryRes] = await Promise.all([
          fetch('/api/coursesfetch'),
          axios.get('/api/category')
        ]);

        const courseData = await courseRes.json();
        if (courseData.success) {
          setCourses(courseData.data);
        }

        const categoryData = categoryRes.data;
        setCateg(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndCategories();
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/signup' });
    router.push('/signup');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {categ.length ? (
        <Categories data={categ} />
      ) : (
        <p>Loading categories...</p>
      )}
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
};

export default Search;
