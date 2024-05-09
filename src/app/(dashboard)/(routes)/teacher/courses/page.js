"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Courses = () => {
    return ( 
        <div className="flex justify-end mr-[8px] overflow-hidden">
          <Link href="/teacher/create"> <Button className="rounded-[7px] mt-[13px] bg-black text-white hover:bg-white hover:text-black">New Course +</Button></Link> 
        </div>
     );
}
 
export default Courses;