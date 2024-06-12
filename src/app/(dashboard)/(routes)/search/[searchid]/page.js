"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaLock } from 'react-icons/fa';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Typing from 'react-typing-effect';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
     
{ chapter.videoUrl && 
          <video controls className="w-full h-auto mt-2 rounded-lg shadow-sm">
            <source src={chapter.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      }
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
      <div className="flex gap-2">
        <Link className="flex gap-2" href={`/search`}>
          <ArrowLeft />
          <h1 className="font-medium">Get back to courses</h1>
        </Link>
      </div>
      <h1 className="text-4xl mt-[10px] font-bold mb-6 animated-gradient leading-tight">
        {course.title}
      </h1>
      <div className="relative h-80 overflow-hidden rounded-lg shadow-md mb-6">
        <Image
          src={course.imageUrl}
          alt={course.title}
          className="object-repeat w-full h-full"
        />
      </div>
      <p className="mt-[55px] text-1xl font-semibold mb-6 animated-gradient">
        {course.description}
      </p>
      {course.attachments && course.attachments.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 animated-gradient">Attachments</h2>
          <ul>
            {course.attachments.map((attachment) => (
              <li key={attachment._id} className="mb-2">
                <Link href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {attachment.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.chapters.map((chapter) => (
          <ChapterItem key={chapter._id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsPage;


