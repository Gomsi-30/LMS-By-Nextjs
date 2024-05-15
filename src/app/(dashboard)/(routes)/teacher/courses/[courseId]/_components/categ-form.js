"use client";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


// Validation schema using Zod
const formSchema = z.object({
  categoryId: z.string().min(1),
});

const Categform = ({course,options=[]}) => {
  //  console.log(Array.isArray(options))
  const {toast} = useToast()
  const [ d,setD] = useState(course.categoryId);
  const [edit, setEdit] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        categoryId: d || "",
    },
  });
  const { handleSubmit, formState: { isSubmitting, isValid }, control } = form;
  const onSubmit = async(values) => {
    // console.log(values);
    const res = await axios.put(`http://localhost:3000/api/courses/${course._id}`,values)
    setD(res.data.course.categoryId)
    console.log(res.data.course.categoryId)
    toast({
      description:"Updated Succesfully",
    })
    // console.log(res.data)
    setEdit(false); // Optionally close edit mode on submit
  };

  const selectedOption = options.find((option) => option.value === d);
  // console.log(selectedOption)
  return (
    <div className="flex flex-col mt-[20px]">
      <div className="flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px] ">
        <div className="flex items-center gap-4">
          <div className="rounded-[7px] bg-slate-300 text-black flex justify-center h-[39px] w-[200px] text-center items-center font-medium">
            {" "}
            Course category
          </div>
          <Button
            onClick={() => setEdit(!edit)}
            className="rounded-[7px] hover:bg-white hover:text-black bg-black text-white w-[90px]"
          >
            {edit ? "Cancel" : "Edit"}
          </Button>
        </div>
        {edit ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                    <Combobox 
                             options={options}
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
        <div className="bg-slate-100 w-[306px] h-[30px]"> 
        {selectedOption ? <i>{selectedOption?.label}</i> : <i>No category selected</i>}
         </div>
        }
      </div>
      <Toaster />
    </div>
  );
};

export default Categform;
