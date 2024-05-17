"use client"
import { Button } from "@/components/ui/button";
export const CategoryItem = ({label,value,icon:Icon})=>{
    return (
        <Button className={`ml-[10px] py-2 mt-[20px] px-3 border border-slate-300 rounded-full flex items-center gap-x-1 hover:border-sky-600 transition`}>
            {Icon &&  <Icon size={20} />}
            <div className="truncate">
               {label}
            </div>
        </Button>
        )
}