"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Titleform from "./_components/title-form";
import { Settings } from "lucide-react";
import Descrform from "./_components/descr-form";
import Imageform from "./_components/image-form";

const Courseid = ({ params }) => {
    const userid = params.courseId;
    const [courseData, setCourseData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!userid) return;
        const fetchCourseData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/userdata", { userid });
                setCourseData(response.data);
            } catch (error) {
                console.error('Error aarai hai:', error);
                setError('Failed to fetch data');
            }
        };
        fetchCourseData();
    }, [userid]);

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
        courseData.categoryId
    ];

    const total = requiredFields.length;
    const completed = requiredFields.filter(Boolean).length;

    return (
        <div className="p-[27px] overflow-hidden">
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Course Setup</h1>
            <p>Completed Fields: {completed} / {total}</p>
            </div>
            <div className="flex mt-[30px] gap-3 items-center">
                <Settings size={30}/>
                <h3 className="text-1xl font-medium">Customize your form</h3>
            </div>
            <Titleform course={courseData}/>
            <Descrform course={courseData}/>
            <Imageform course={courseData}/>
        </div>
    );
};

export default Courseid;
