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
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatPrice } from "./format-price";


// Validation schema using Zod
const formSchema = z.object({
  price: z.string().min(1),
});



const Priceform = ({course}) => {
  const {toast} = useToast()
  const [edit, setEdit] = useState(false);
  const [d, setD] = useState(course.price);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: d || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async(values) => {
    // console.log(values);
    const res = await axios.put(`http://localhost:3000/api/courses/${course._id}`,values)
    setD(res.data.course.price)
   
    toast({
      description:"Updated Succesfully",
    })
    // console.log(res.data)
    setEdit(false); // Optionally close edit mode on submit
  };

  return (
    <div className="flex flex-col mt-[20px]">
      <div className="flex overflow-hidden bg-slate-100 rounded-[10px] flex-col p-[15px] gap-4 w-[380px] ">
        <div className="flex items-center gap-4">
          <div className="rounded-[7px] bg-slate-300 text-black flex justify-center h-[39px] w-[200px] text-center items-center font-medium">
            {" "}
            Course Price
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
                name="price"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={isSubmitting}
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
        { d == null ?
         <i>Please provide a price.</i>
         :
         <i>{ formatPrice(d)}</i>
        }
         </div>
        }
      </div>
      <Toaster />
    </div>
  );
};

export default Priceform;
