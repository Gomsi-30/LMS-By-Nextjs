import {AlertTriangle, CheckCircleIcon} from "lucide-react"

export const Banner = ({label})=>{
    return (
        <div
        className="p-[20px] w-full bg-yellow-200 h-[65px]"
        >

        <div className="flex gap-3">
           <AlertTriangle />
           <h1 className="text-1xl font-semibold">{label}</h1>
        </div>
      
        </div>
    )
}