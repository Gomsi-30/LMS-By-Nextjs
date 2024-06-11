"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Description } from "@radix-ui/react-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must not be empty",
  }),
});

const Create = () => {
  const { toast } = useToast();
  const route = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // api calling
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/courses",
        values
      );
      toast({
        description: "Course created succesfully",
      });
      route.push(`/teacher/courses/${response.data._id}`);
    } catch (e) {
    
    }
  };

  return (
    <div className="flex items-center justify-center p-[10px] mt-[140px] ml-[190px] g-10">
      <div className="">
        <h1 className="text-3xl font-bold">Name your course</h1>
        <p className="mt-[20px]">
          What would you like to name your course? Dont worry, you can change
          this later.
        </p>

        <Form className="mt-[50px]" {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[290px] rounded-[5px]"
                      placeholder="e.g. 'Advance web development'"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    Please provide a title of at least 5 characters.
                  </FormDescription>
                  {error && (
                    <FormMessage className="text-red-600">
                      {error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            ></FormField>
            <div className="flex items-center gap-5">
              <Link href="/">
                <Button className="bg-black text-white rounded-[7px] mt-[12px] hover:bg-white hover:text-black">
                  Cancel
                </Button>
              </Link>
              <Button
                disabled={isSubmitting || !isValid}
                className="bg-black text-white rounded-[7px] mt-[12px] hover:bg-white hover:text-black"
                type="submit"
              >
                Add Item
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );
};

export default Create;






