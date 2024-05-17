"use client"
import axios from "axios";
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
// import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import Link from "next/link";
 import {useEffect,useState} from "react"

export async function loader(){
     const ans = await axios.get('/api/teacherApi')
     return ans;
}

const Courses = () => {
const [course,setCourse] = useState()
useEffect(() => {
  console.log("use effect cal....")
  const fetchData = async () => {
    const ans = await loader();
    console.log(ans.data.courses)
    setCourse(ans.data.courses)
  }
  fetchData();
}, []);

return ( 
      <> 

        <div className="flex justify-end mr-[8px] overflow-hidden">
       
          </div>
        
          <div className="p-[40px] ">
          {course ?
          <DataTable columns={columns} data={course} /> : <p> loading...</p>}
          </div>
</>
       
     );
}
 
export default Courses;