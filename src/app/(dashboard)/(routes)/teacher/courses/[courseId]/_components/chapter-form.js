"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChaptersList from "./chapters-list";
import { useRouter } from "next/navigation";


// Validation schema using Zod
const formSchema = z.object({
  title: z.string().min(1)
})

const Chapterform = ({course}) => {
  const router = useRouter()
  const {toast} = useToast()
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [d, setD] = useState(course.chapters);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async(values) => {
    console.log(values);
    const res = await axios.post(`/api/courses/${course._id}/chapters`,values)
    setD(res.data.chapters)
    console.log(res.data)
    toast({
      description:"Updated Succesfully",
    })
    // console.log(res.data)
    setEdit(false); // Optionally close edit mode on submit
  };

  const onReorder = async (bulkUpdateData) => {
    setUpdate(true);
    try {
        await axios.put(`/api/courses/${course._id}/chapters/reorder`, {
            list: bulkUpdateData  // Assuming the server expects an array under the key "list"
        });
        setUpdate(false);
        toast({
            // title: "Success",
            description: "Chapters reordered successfully.",
            status: "success",
            duration: 5000,
           
        });
    } catch (error) {
        console.error("Reordering failed:", error);
        setUpdate(false);
        toast({
            // title: "Error",
            description: "Failed to reorder chapters.",
            status: "error",
            duration: 5000,
           
            variant:"destructive"
        });
    }
}

const onEdit = (id)=>{
   router.push(`/teacher/courses/${course._id}/chapters/${id}`)
}

  return (

    <div className="relative flex flex-col mt-[20px]">
    {
      update &&
    <div className="absolute h-full flex items-center top-0 left-0 right-0 justify-center w-full bg-slate-200 opacity-40">
      <Loader2 className="animate-spin mr-[200px]"/>
    </div>
    }
      <div className="bg-slate-200 flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px] ">
        <div className="flex items-center gap-4">
        <div className="rounded-[4px] bg-blue-500 text-white flex justify-center h-10 w-52 text-center items-center font-medium">
            {" "}
            Chapter Form
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
            {edit ? "Cancel" : "Edit"}
          </Button>
        </div>
        {edit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isSubmitting}
                        className="rounded-[7px] w-[306px] border-black"
                        placeholder="e.g Introduction of chapter"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide a valid chapter for your course.
                    </FormDescription>
                    {error && (
                      <FormMessage className="text-red-600">{error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting || !isValid}
                type="submit"
                className="text-white bg-black mt-4 rounded-[7px] w-[110px]"
              >
                Save
              </Button>
            </form>
          </Form>
        )
         

         
        }
<div><ChaptersList
             onEdit ={onEdit}
             onReorder ={onReorder}
             items={d || []}
          /></div>
          


      </div>
      <Toaster />
    </div>
  );
};

export default Chapterform;
