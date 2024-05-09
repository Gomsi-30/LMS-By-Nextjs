import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"
const Sign = () => {
  return (
    <div className="mt-[19px]">
    <div className="flex flex-col w-[300px] gap-5">
    
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
      <Button className="bg-slate-700 w-[320px]">Login</Button>
     
      <Button className="flex gap-2 bg-cyan-500 w-[320px]"> 
      Sigup with Google
      <Image src="/google.svg" height={20} width={20} />
      </Button>
     
    </div>
  </div>
  );
};

export default Sign;
