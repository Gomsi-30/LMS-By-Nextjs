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
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


// Validation schema using Zod
const formSchema = z.object({
  description: z.string().min(4, { message: "Description cannot be empty" }),
});

// const course = {
//   descr: "Introduction to Web Development",
//   description:
//     "Learn the basics of HTML, CSS, and JavaScript to build your first website! This course covers everything from setting up your development environment to deploying your site.",
//   price: 99.99,
//   isPublished: true,
// };

const Descrform = ({course}) => {
  const {toast} = useToast()
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState(course.description);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: d,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async(values) => {
    // console.log(values);
    const res = await axios.put(`http://localhost:3000/api/courses/${course._id}`,values)
    setD(res.data.course.description)
    console.log(res.data.course.description)
    toast({
      description:"Updated Succesfully",
    })
    // console.log(res.data)
    setEdit(false); // Optionally close edit mode on submit
  };

  return (
    <div className="flex flex-col mt-[20px]">
    <div className="bg-slate-200 flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px] ">
      <div className="flex items-center gap-4">
        <div className="rounded-[4px] bg-blue-500 text-white flex justify-center h-10 w-52 text-center items-center font-medium">
          Course description
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
      {edit ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
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
              className="text-white bg-black mt-[20px] rounded-[7px] w-[110px]"
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="bg-slate-100 w-[306px] h-[30px]"> 
          { d == null ?
            <i>Please provide a description.</i>
            :
            <i>{d}</i>
          }
        </div>
      )}
    </div>
    <Toaster />
  </div>
  
  
  );
};

export default Descrform;
