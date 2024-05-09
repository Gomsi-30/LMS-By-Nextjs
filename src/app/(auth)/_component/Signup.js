"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast"

import Image from "next/image"
const Sign = () => {
  const { toast}  = useToast()
  return (
    <div className="mt-[19px]">
      <div className="flex flex-col w-[300px] gap-5">
      
        <Input
          className="w-[320px]"
          type="email"
          placeholder="Enter your name"
        />
        <Input
          className="w-[320px]"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          className="w-[320px]"
          type="email"
          placeholder="Enter your password"
        />
        <Button 
        onClick={() => {
        toast({
          // title: "Scheduled: Catch up",
          description: "Signing you up! Please wait...",
          // variant: "destructive",
          
        })}} className="bg-cyan-700 w-[320px]">Signup</Button>
       
        <Button className="flex gap-2 bg-cyan-500 w-[320px]"> 
        Sigup with Google
        <Image src="/google.svg" height={20} width={20} />
        </Button>
       
      </div>
      <Toaster />
    </div>
   
  );
};

export default Sign;
