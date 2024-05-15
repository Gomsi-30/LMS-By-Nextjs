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
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Checkbox} from "@/components/ui/checkbox"

// Validation schema using Zod
const formSchema = z.object({
  isFree: z.boolean().default(false)
});

const Chapteraccess = ({chapter,id}) => {
  const {toast} = useToast()
  const [edit, setEdit] = useState(false);
  const [chapters,setChapter] = useState(chapter.isFree);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!chapters.isFree
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async(values) => {
    console.log(values);
    const result = await axios.put(`/api/courses/${id}/chapters/${chapter._id}`,values)
 
    setChapter(result.data.isFree)
    if(result)
   
    toast({
      description:"Updated Succesfully",
    })
  
    setEdit(false); 
  };

  return (
    <div className="flex flex-col mt-5">
    <div className="flex overflow-hidden bg-white rounded-[4px] flex-col p-6 gap-4 w-96 shadow-lg">
        <div className="flex items-center gap-4">
            <div className="rounded-[4px] bg-blue-500 text-white flex justify-center h-10 w-52 text-center items-center font-medium">
                Chapter Access Setting
            </div>
            <Button
                onClick={() => setEdit(!edit)}
                className="relative overflow-hidden rounded-[4px] w-24 transition duration-300"
                style={{
                    backgroundImage: edit ? 'linear-gradient(to right, #ef4444 50%, #dc2626 50%)' : 'linear-gradient(to right, #34d399 50%, #059669 50%)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: 'right bottom',
                    color: 'white'
                }}
            >
                <span className="z-10 relative">
                    {edit ? "Cancel" : "Edit"}
                </span>
            </Button>
        </div>
        {edit ? (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem className="flex flex-row items-center space-x-3 rounded-[4px] border p-4">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormDescription className="text-gray-600">
                                        Check this box if you want to make this chapter free for preview
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="relative overflow-hidden rounded-[4px] w-28 transition duration-300"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #60a5fa 50%, #2563eb 50%)',
                            backgroundSize: '200% 100%',
                            backgroundPosition: 'right bottom',
                            color: 'white'
                        }}
                    >
                        <span className="z-10 relative">Save</span>
                    </Button>
                </form>
            </Form>
        ) : (
            <div className="bg-gray-100 w-full h-8 flex items-center px-2 text-gray-800 rounded-[4px]">
                {!chapters.isFree ? "This chapter is not free." : "This chapter is free for preview."}
            </div>
        )}
    </div>
    <Toaster />
</div>
  );
};

export default Chapteraccess;
