"use client"
import axios from "axios";
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
// import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {useEffect,useState} from "react"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export async function loader(){
     const ans = await axios.get('/api/teacherApi')
     return ans;
}

const Courses = () => {
const [course,setCourse] = useState()
const router = useRouter()
useEffect(() => {
  console.log("use effect cal....")
  const fetchData = async () => {
    const ans = await loader();
    console.log(ans.data.courses)
    setCourse(ans.data.courses)
  }
  fetchData();
}, []);
   
const handleLogout = async () => {
  await signOut({ redirect: false, callbackUrl: '/signup' });
  router.push('/signup')
};
return ( 
      <>       
        <div className="flex justify-end mr-[8px] overflow-hidden">
        <button 
      onClick={handleLogout}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
          </div>
        
          <div className="p-[40px] ">
          {course ?
          <DataTable columns={columns} data={course} /> : <p> loading...</p>}
          </div>
</>
       
     );
}
 
export default Courses;