"use client";
import axios from "axios";
import { useLoaderData } from "next/navigation";
import { useEffect, useState } from "react";
import Titleform from "./_components/title-form";
import { FileCheckIcon, IndianRupeeIcon, Settings } from "lucide-react";
import Descrform from "./_components/descr-form";
import Imageform from "./_components/image-form";
import Categform from "./_components/categ-form";
import Priceform from "./_components/price-form";
import Attachform from "./_components/attach-form";
import Chapterform from "./_components/chapter-form";
import { Banner } from "@/components/banner";
import CourseActions from "./_components/course-action";


export async function loader() {
  const res = await axios.get("http://localhost:3000/api/category");
  return res.data;  // Ensure you return the data part of the response
}

const Courseid = ({ params }) => {
  const [c, setC] = useState([]);
  const userid = params.courseId;
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await loader();
    //   console.log(categoryData)
    //  console.log(Array.isArray(categoryData))
     setC(categoryData.map(cat => ({ 
      label: cat.name, 
      value: cat._id 
      }))); 
    };
    fetchData();

    if (!userid) return;
    const fetchCourseData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/userdata",
          { userid }
        );
        setCourseData(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error aarai hai:", error);
        setError("Failed to fetch data");
      }
    };
    fetchCourseData();
  }, []);
  console.log(Array.isArray(c))
  console.log(c)
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const requiredFields = [
    courseData.title,
    courseData.description,
    courseData.price,
    courseData.imageUrl,
    courseData.categoryId,
    // courseData.chapters.some(chap=>chap.isPublished)
  ];
  
  const total = requiredFields.length;
  const completed = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean)
  return (
    <>
     {!courseData.isPublished && <Banner className="z-[100]" label="Not published yet. Make sure you completed all the fields!" />}
    <div className="p-[15px]">
     
     <div className="flex flex-col gap-[20px] p-[15px]">
    
        <h1 className="text-2xl font-semibold">Course Setup</h1>
        <p>
          Completed Fields: {completed} / {total}
        </p>
      
      <div className="flex mt-[30px] gap-11 items-center">
        <Settings size={30} />
        <h3 className="text-1xl font-medium">Customize your form</h3>
      </div>
      <CourseActions
            disabled={!isComplete}
            courseid={userid}
            isPublished={courseData.isPublished}
            />
      </div>
      <div className="flex gap-[30px] p-[20px]">
      <div className="flex flex-col gap-[20px]">
      
      <Titleform course={courseData} />
      <Descrform course={courseData} />
      <Imageform course={courseData} />
      </div>
      <div className="flex flex-col gap-[20px]">
      <Categform
        course={courseData}
        options={
            c? c : []}
        
      />
      
       <div className="flex bg-yellow-200 mt-[20px] h-[50px] bg-slate-100 gap-11 items-center">
       <FileCheckIcon size={20}/>
       <h1 className="font-semibold ">Course Chapters</h1>
       </div>
      <Chapterform  course={courseData}/>
    
      </div>
        
       <div className=" flex flex-col gap-[20px]">
       <div className=" bg-yellow-200 flex mt-[20px] h-[50px]  gap-11 items-center">
       <IndianRupeeIcon size={20}/>
       <h1 className="font-semibold">Set your price</h1>
       </div>
       
        <Priceform course={courseData}/>
  
       <div className=" flex mt-[20px] h-[50px] bg-yellow-200  gap-11 items-center">
         <FileCheckIcon size={20}/>
         <h1 className="font-semibold">Resources & Attachments</h1>
       </div>
        <Attachform course={courseData}/>
      
       </div>
      
      </div>
    </div>
    </>
  );
};

export default Courseid;
