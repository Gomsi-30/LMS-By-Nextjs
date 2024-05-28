"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react";
import axios from "axios";

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";
const Sign = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

const { toast}  = useToast()
const route = useRouter()
  const handle=async()=>{
    try{
     const res = await axios.post('http://localhost:3000/api/signin',{name,email,password})
     console.log(res.data)
     toast({
      description:"Succesfully"
    })
    // route.push('/confirm')
    }catch(e){
      toast({
        description:"Invalid Input",
        variant:"destructive"
      })
      console.log(e)
      route.push('/signup')
    }
   
  }
  const handle2 = async () => {
    await signIn("google",{
      redirect:true,
      callbackUrl: '/' 
    });
    toast({
      description:"Succesfully"
    })
  };

  return (
    <div className="mt-[19px]">
      <div className="flex flex-col w-[300px] gap-5">
      
        <Input
        value={name} onChange={(e)=>setName(e.target.value)}
          className="w-[320px]"
          type="email"
          placeholder="Enter your name"
        />
        <Input
        value={email} onChange={(e)=>setEmail(e.target.value)}
          className="w-[320px]"
          type="email"
          placeholder="Enter your email"
        />
        <Input
        value={password} onChange={(e)=>setPassword(e.target.value)}
          className="w-[320px]"
          type="password"
          placeholder="Enter your password"
        />
        <Button 
        onClick={handle}
        
       className="bg-cyan-700 w-[320px]">Signup</Button>
       
        <Button onClick={handle2} className="flex gap-2 bg-cyan-500 w-[320px]"> 
        Sigup with Google
        <Image src="/google.svg" height={20} width={20} />
        </Button>
       
      </div>
      <Toaster />
    </div>
   
  );
};

export default Sign;
