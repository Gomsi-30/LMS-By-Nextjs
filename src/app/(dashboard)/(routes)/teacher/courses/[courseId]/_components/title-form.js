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
    <div className="flex flex-col mt-[20px]">
      <div className="flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px] ">
        <div className="flex items-center gap-4">
          <div className="rounded-[7px] bg-slate-300 text-black flex justify-center h-[39px] w-[200px] text-center items-center font-medium">
            {" "}
            Course title
          </div>
          <Button
            onClick={() => setEdit(!edit)}
            className="rounded-[7px] bg-black text-white w-[90px]"
          >
            {edit ? "Cancel" : "Edit"}
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
                      <Input disabled={isSubmitting}
                        className="rounded-[7px] w-[306px] border-black"
                        {...field}
                      />  
                    </FormControl>
                    <FormDescription>
                      Please provide a valid title for your course.
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
        :
        <div className="bg-slate-100 w-[306px] h-[30px]"> <i>{t}</i> </div>
        }
      </div>
      <Toaster />
    </div>
  );
};

export default Titleform;
