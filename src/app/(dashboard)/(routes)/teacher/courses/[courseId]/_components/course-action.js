"use client"
import {Trash} from "lucide-react"
import axios from "axios"
import { Loader2 } from "lucide-react";
import {Useconfetti}  from "@/hooks/use-confetti"
import {useRouter} from "next/navigation"
import { Toaster } from "@/components/ui/toaster";
import {useState} from "react"
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"
const CourseActions = ({disabled,courseid,isPublished}) => {
  const confetti = Useconfetti()
    const [l,setL] = useState(false)
    const router = useRouter()
    const {toast} = useToast()
    const onClick=async()=>{
      try{
       setL(true)
      if(!isPublished){
       const ans =  await axios.put(`/api/courses/${courseid}/publish`)
       console.log(ans)
       setL(false)
       confetti.onOpen()
       toast({
        description:"Published Succesfully",
      })
     
      console.log("hogya")
     
      window.location.reload()
      }else{
        const res = await axios.put(`/api/courses/${courseid}/unpublish`,)
        console.log(res)
        toast({
          description:"Unpublished Succesfully",
        })
        window.location.reload()
        setL(false)
      }
      }catch{
       
      }
   }

    const onDelete=async()=>{
       try{
        setL(true)
         const res = await axios.delete(`/api/courses/${courseid}`,)
         router.refresh()
         router.push(`/teacher/courses`)
         setL(false)
       }catch{
        
       }
    }
    return ( 
        <div className="flex items-center gap-x-2">
        {l &&
         <div className="absolute h-full flex items-center top-0 left-0 right-0 justify-center w-full bg-slate-200 opacity-40">
      <Loader2 className="animate-spin h-[100px] w-[100px]"/>
    </div>}
            <Button className="bg-black text-yellow-400" onClick={onClick}
              
                disabled={disabled || l}
                variant="outline"
                size="sm"
                >
                  {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" disabled={l}>
              <Trash className="h-4 w-4"/>
            </Button>
            </ConfirmModal>
            <Toaster />
        </div>
     );
}
 
export default CourseActions;