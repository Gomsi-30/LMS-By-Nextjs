"use client";
import { FileUpload } from "@/components/file-form";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  imageUrl: z.string().min(4, { message: "Image cannot be empty" }),
});

const Imageform = ({ course }) => {
  
  const { toast } = useToast();
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState(course.imageUrl); // State to hold the current image URL

  const onImageUpload = async(url) => {
    const res = await axios.put(`http://localhost:3000/api/courses/${course._id}`,{imageUrl:url})
      setD(res.data.course.imageUrl)
      toast({
        description: "Image added succesfullly",
      }); // Update the state with the new image URL
      // form.setValue('imageUrl', url); // Also update the form value if necessary
    
  };

  return (
    <div className="flex flex-col mt-[20px]">
      <div className="flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px]">
        <div className="flex items-center gap-4">
          <div className="rounded-[7px] bg-slate-300 text-black flex justify-center h-[39px] w-[200px] text-center items-center font-medium">
            Course image
          </div>
          <Button
            onClick={() => setEdit(!edit)}
            className="rounded-[7px] hover:bg-white hover:text-black bg-black text-white w-[90px]"
          >
            <Pencil size={20} />
          </Button>
        </div>
        {(!edit || edit) && d && (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Uploaded image"
              fill
              className="object-cover rounded-md"
              src={d}
            />
          </div>
        )}
        {!edit && !d && (
          <div className="flex items-center justify-center h-[220px] rounded-lg bg-slate-400">
            <ImageIcon size={37} />
          </div>
        )}
      
        {edit && (!d || d) && (
          <div>
            <FileUpload endpoint="courseImage" onChange={onImageUpload} />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Imageform;
