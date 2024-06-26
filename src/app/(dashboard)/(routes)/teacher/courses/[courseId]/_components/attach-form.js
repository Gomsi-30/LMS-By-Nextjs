"use client";
import { FileUpload } from "@/components/file-form";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { DeleteIcon, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



const Attachform = ({ course }) => {
  
  const { toast } = useToast();
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState(course.attachments);
//   const [e, setE] = useState();
  const call=async(idd)=>{
    console.log(idd)
    const res = await axios.post(`/api/courses/${course._id}/attachments/${idd}`,{idd})
    console.log(res.data)
    setD(res.data.attachments)
    toast({
      description: "Image added succesfullly",
    });
  }
  const onImageUpload = async(url) => {
    const res = await axios.post(`/api/courses/${course._id}/attachments`,{url})
      setD(res.data.attachments)
    //   console.log(res.data.attachments)
    //   setD(res.data.url)
    //   setE(res.data._id)
    //   console.log(e)
      toast({
        description: "Image added succesfullly",
      }); 
   }
    
  return (
    <div className="flex flex-col mt-[20px]">
      <div className="bg-slate-200 flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px]">
        <div className="flex items-center gap-4">
          <div className="rounded-[4px] bg-blue-500 text-white flex justify-center h-10 w-52 text-center items-center font-medium">
            Course Attachment
          </div>
          <Button
            onClick={() => setEdit(!edit)}
            className="relative overflow-hidden rounded-[4px] w-24 transition duration-300"
            style={{
              backgroundImage: edit ? 'linear-gradient(to right, #ef4444 50%, #dc2626 50%)' : 'linear-gradient(to right, #34d399 50%, #059669 50%)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right bottom',
              color: 'white',
            }}
          >
            <Pencil size={20} />
          </Button>
        </div>
       
     
      {edit &&
          <div>
            <FileUpload endpoint="courseAttachment" onChange={onImageUpload} />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
      }
      </div>
      <div className="w-[500px] flex flex-col  bg-blue-100">
     
      {d.map((attachment) => (
                <div className="flex items-center" key={attachment._id}>
                    <Button onClick={() => call(attachment._id)}><DeleteIcon /></Button>
                    <h1>{attachment.name}</h1>
                </div>
            ))}
      </div>
      {/* <Button onClick={del}>delete</Button> */}
      <Toaster />
    </div>
  );
};

export default Attachform;
