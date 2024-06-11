"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import Chapteraccess from "./_components/chapter-access";
import Chaptervideo from "./_components/chapter-video";
import Chaptertitleform from "./_components/chapter-title-form";
import Chapterdescform from "./_components/chapter-desc-form";
import { EyeIcon, CameraIcon, ArrowLeft } from "lucide-react";
import { Banner } from "@/components/banner";
import Link from "next/link";
import ChapterActions from "./_components/chapter-action";
const Chapterid = ({ params }) => {
  const [chapter, setChapter] = useState(null); // Set initial state to null for clarity
  const userid = params.courseId;
  const id = params.chapterId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/chapterdata", {
          id,
          userid,
        });
        setChapter(res.data);
        console.log(res.data); // Log inside try after successful fetch
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };
    fetchData();
  }, [id, userid]);
  if (!chapter) {
    return <div>Loading...</div>;
  }
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <div>
      {chapter ? (
        <div>
          {!chapter.isPublished && (
            <Banner label="Not published yet. Make sure you press the Published Action button!" />
          )}
          <div className="flex gap-2">
            <Link className="flex gap-2" href={`/teacher/courses/${userid}`}>
              <ArrowLeft />
              <h1 className = "font-medium"> Get back to chapter </h1>
            </Link>
          </div>
  <div  className="flex gap-[40px] m-[30px]">
      <div className="flex flex-col">
          <h1 className = "text-2xl font-medium ">Chapter Setup.. {completionText}</h1>
          <ChapterActions className="mt-[20px]"
            disabled={!isComplete}
            courseid={userid}
            chapterid={chapter._id}
            isPublished={chapter.isPublished}
          />
          <Chaptertitleform className=" mt-[20px]" chapter={chapter} id={userid} />

          <Chapterdescform className=" mt-[20px]" chapter={chapter} id={userid} />
          {/* <div className="flex gap-2 mt-[20px]">
            <EyeIcon />
            <h1 className = "font-medium">Access Settings</h1>
          </div>
          <Chapteraccess className=" mt-[20px]" chapter={chapter} id={userid} /> */}
          </div>
          <div classNmae="flex flex-col">
          <div className="flex gap-2">
            <CameraIcon />
            <h2 className = "font-medium"> Add a video</h2>
          </div>
          <Chaptervideo chapter={chapter} id={userid} />
          </div>
          </div>
  </div>
   
      ) : (
        <p>Loading chapter data...</p>
      )}
    </div>
  );
};

export default Chapterid;
