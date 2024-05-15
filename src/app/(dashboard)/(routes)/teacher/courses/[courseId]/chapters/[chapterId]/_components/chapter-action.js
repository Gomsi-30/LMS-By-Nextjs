"use client"
import {Trash} from "lucide-react"
import axios from "axios"
import {useRouter} from "next/navigation"
import { Toaster } from "@/components/ui/toaster";
import {useState} from "react"
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"
const ChapterActions = ({disabled,courseid,chapterid,isPublished}) => {
    const [l,setL] = useState(false)
    const router = useRouter()
    const {toast} = useToast()
    const onClick=async()=>{
      try{
       setL(true)
      if(!isPublished){
       const ans =  await axios.put(`/api/courses/${courseid}/chapters/${chapterid}/publish`)
       console.log(ans)
       toast({
        description:"Published Succesfully",
      })
       router.refresh()
      }else{
        const res = await axios.put(`/api/courses/${courseid}/chapters/${chapterid}/unpublish`,)
        console.log(res)
        toast({
          description:"Unpublished Succesfully",
        })
        router.refresh()
        router.push(`/teacher/courses/${courseid}`)
        setL(false)
      }
      }catch{
       
      }
   }

    const onDelete=async()=>{
       try{
        setL(true)
         const res = await axios.delete(`/api/courses/${courseid}/chapters/${chapterid}`,)
         router.refresh()
         router.push(`/teacher/courses/${courseid}`)
         setL(false)
       }catch{
        
       }
    }
    return ( 
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick}
              
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
 
export default ChapterActions;