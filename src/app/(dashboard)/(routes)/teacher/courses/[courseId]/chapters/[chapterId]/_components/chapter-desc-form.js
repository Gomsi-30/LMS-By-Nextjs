"use client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema using Zod
const formSchema = z.object({
    description:  z.string().min(1, { message: "Desc cannot be empty" }),
});

const Chapterdescform = ({chapter,id}) => {
  const {toast} = useToast()
  const [edit, setEdit] = useState(false);
  const [chapters,setChapter] = useState(chapter.description);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: chapters
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async(values) => {
    console.log(values);
    const result = await axios.put(`/api/courses/${id}/chapters/${chapter._id}`,values)
 
    setChapter(result.data.description)
    if(result)
   
    toast({
      description:"Updated Succesfully",
    })
  
    setEdit(false); 
  };

  return (
    <div className="flex flex-col mt-[20px]">
            <div className="flex overflow-hidden bg-white rounded-[4px] justify-center  flex-col p-[15px] gap-4 w-[380px] shadow-md">
                <div className="flex justify-center items-center gap-4">
                    <div className=" rounded-[4px] bg-blue-500 text-white flex items-center justify-center h-[39px] w-[220px] text-center items-center font-medium">
                        Chapter description form
                    </div>
                    <Button
                        onClick={() => setEdit(!edit)}
                        className={`rounded-[4px] ${edit ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:from-black hover:to-gray-500 bg-gradient-to-r'} text-white w-[90px] transition-all duration-300`}
                    >
                        {edit ? "Cancel" : "Edit"}
                    </Button>
                </div>
                {edit ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormControl>
                                        <Textarea disabled={isSubmitting}
                        className="rounded-[7px] w-[306px] border-black"
                        placeholder="e.g This is for your course description. Provide more details here!"
                        {...field}
                      />
                                        </FormControl>
                                        <FormDescription>
                                            Please provide a valid description for your course.
                                        </FormDescription>
                                        {error && (
                                            <FormMessage className="text-red-600">{error.message}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <Button
                               disabled={isSubmitting || !isValid}
                                type="submit"
                                className="text-white bg-black mt-4 rounded-[4px] w-[110px] hover:bg-gradient-to-r from-blue-500 to-cyan-500"
                            >
                                Save
                            </Button>
                        </form>
                    </Form>
                ) : (
                    <div className="bg-slate-100 w-[306px] ml-[15px] h-[30px]">
                      {chapters}
                    </div>
                )}
            </div>
            <Toaster />
        </div>
  );
};

export default Chapterdescform;

