// pages/courses/[id].js
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaLock } from 'react-icons/fa';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Typing from 'react-typing-effect';
import Image from 'next/image';

const ChapterItem = ({ chapter }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 shadow-md relative">
      <h3 className="text-lg font-semibold mb-2 animated-gradient">
        <Typing speed={20} eraseSpeed={20} text={chapter.title} />
      </h3>
      <div className="flex justify-between items-center">
        <button
          onClick={toggleDescription}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isDescriptionVisible ? (
            <div className="flex items-center">
              <AiOutlineUp className="mr-1" /> Hide Description
            </div>
          ) : (
            <div className="flex items-center">
              <AiOutlineDown className="mr-1" /> Show Description
            </div>
          )}
        </button>
      </div>
      {isDescriptionVisible && (
        <p className="text-gray-600 mt-2 animated-gradient">
          <Typing speed={20} eraseSpeed={20} text={chapter.description} />
        </p>
      )}
      {chapter.isFree ? (
        chapter.videoUrl && (
          <video controls className="w-full h-auto mt-2 rounded-lg shadow-sm">
            <source src={chapter.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <div className="relative w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mt-2">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <img
              src={chapter.videoUrl}
              alt={chapter.title}
              className="object-cover w-full h-full opacity-50"
            />
          </div>
          <FaLock className="text-gray-500 text-3xl z-10" />
        </div>
      )}
    </div>
  );
};

const CourseDetailsPage = ({ params }) => {
  const id = params.searchid;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/coursesfetch/${id}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
    <h1 className="text-4xl font-bold mb-6 animated-gradient leading-tight">
     {course.title} 
    </h1>
    <div className="relative h-80 overflow-hidden rounded-lg shadow-md mb-6">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="object-repeat w-full h-full"
      />
    </div>
    <p className="mt-[55px] text-1xl font-semibold mb-6 animated-gradient">
       {course.description}
      </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {course.chapters.map((chapter) => (
        <ChapterItem key={chapter._id} chapter={chapter} />
      ))}
    </div>
  </div>
);
};

export default CourseDetailsPage;
