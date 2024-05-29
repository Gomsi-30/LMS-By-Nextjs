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
  title: z.string().min(4, { message: "Title cannot be empty" }),
});

// const course = {
//   title: "Introduction to Web Development",
//   description:
//     "Learn the basics of HTML, CSS, and JavaScript to build your first website! This course covers everything from setting up your development environment to deploying your site.",
//   price: 99.99,
//   isPublished: true,
// };

const Titleform = ({course}) => {
  const {toast} = useToast()
  const [edit, setEdit] = useState(false);
  const [t, setT] = useState(course.title);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: t,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async(values) => {
    // console.log(values);
    const res = await axios.put(`http://localhost:3000/api/courses/${course._id}`,values)
    setT(res.data.course.title)
    console.log(res.data.course.title)
    toast({
      description:"Updated Succesfully",
    })
    // console.log(res)
    setEdit(false); // Optionally close edit mode on submit
  };

  return (
    <div className="flex flex-col mt-5">
    <div className="bg-slate-200 flex overflow-hidden bg-white rounded-[4px] flex-col p-6 gap-4 w-96 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="rounded-[4px] bg-blue-500 text-white flex justify-center h-10 w-52 text-center items-center font-medium">
          Course title
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
              name="title"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="rounded-[4px] w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600">
                    Please provide a valid title for your course.
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
              className="relative overflow-hidden rounded-[4px] w-28 transition duration-300"
              style={{
                backgroundImage: 'linear-gradient(to right, #60a5fa 50%, #2563eb 50%)',
                backgroundSize: '200% 100%',
                backgroundPosition: 'right bottom',
                color: 'white',
              }}
            >
              <span className="z-10 relative">Save</span>
            </Button>
          </form>
        </Form>
      ) : (
        <div className="bg-gray-100 w-full h-8 flex items-center px-2 text-gray-800 rounded-[4px]">
          <i>{t}</i>
        </div>
      )}
    </div>
    <Toaster />
  </div>
  
  );
};

export default Titleform;
