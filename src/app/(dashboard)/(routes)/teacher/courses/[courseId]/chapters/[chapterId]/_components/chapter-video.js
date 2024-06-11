"use client";
import { FileUpload } from "@/components/file-form";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { ImageIcon, Pencil ,CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  videoUrl: z.string().min(4),
});

const Chaptervideo = ({ chapter,id }) => {
  
  const { toast } = useToast();
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState(chapter.muxdatas); // State to hold the current image URL

  const onImageUpload = async(url) => {
    const res = await axios.put(`/api/courses/${id}/chapters/${chapter._id}`,{videoUrl:url})
    console.log(res.data.muxdatas)
      setD(res.data.muxdatas)
      toast({
        description: "Image added succesfullly",
      });     
  };

  return (
   <div className="flex flex-col mt-5">
    <div className="flex overflow-hidden bg-white rounded-[10px] flex-col p-4 gap-4 w-[380px] shadow-lg">
        <div className="flex items-center gap-4">
        <div className=" rounded-[4px] bg-blue-500 text-white flex items-center justify-center h-[39px] w-[220px] text-center items-center font-medium">
                Course Video
            </div>
            <Button
                onClick={() => setEdit(!edit)}
                className="relative overflow-hidden rounded-[7px] w-[90px] hover:bg-white hover:text-black bg-black text-white transition duration-300 ease-in-out"
                style={{
                    backgroundImage: 'linear-gradient(to right, #34d399 0%, #059669 100%)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: 'right bottom'
                }}
            >
                <Pencil size={20} className="text-white" />
            </Button>
        </div>
        {!edit && !d && (
            <div className="flex items-center justify-center h-56 rounded-[7px] bg-gray-400">
                <CameraIcon size={37} className="text-white" />
            </div>
        )}
        {edit && (
            <div>
                <FileUpload endpoint="courseVideo" onChange={onImageUpload} />
                <div className="text-sm text-gray-500 mt-4">
                    16:9 aspect ratio recommended
                </div>
            </div>
        )}
        {d != null && (
            <div className="mt-4">
                <MuxPlayer playbackId={d.playbackID} />
            </div>
        )}
    </div>
    <Toaster />
</div>

  );
};

export default Chaptervideo
