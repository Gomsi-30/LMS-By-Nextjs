"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image"
import { EyeIcon, EyeOff, EyeOffIcon } from "lucide-react";
import { useState } from "react";
const Sign = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const handle = async () => {
    let result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: '/confirm' 
    });
  };

  const handle2 = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
    toast({
      description: "Succesfully",
    });
  };


  const handle4 = async () => {
    setShow(!show);
  };


  return (
    <div className="mt-[19px]">
    <div className="flex flex-col w-[300px] gap-5">
    
      <Input
 value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-[320px]"
        type="email"
        placeholder="Enter your email"
      />
      {!show ? (
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[320px]"
            type="password"
            placeholder="Enter your password"
          />
        ) : (
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[320px]"
            type="text"
            placeholder="Enter your password"
          />
        )}
      
      <Button className="absolute top-[371px] left-[875px]" onClick={handle4}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </Button>

      <Button onClick={handle} className="bg-slate-700 w-[320px]">Login</Button>
     
      <Button onCLick={handle2}  className="flex gap-2 bg-cyan-500 w-[320px]"> 
      Sigup with Google
      <Image src="/google.svg" height={20} width={20} alt="" />
      </Button>
     
    </div>
  </div>
  );
};

export default Sign;
