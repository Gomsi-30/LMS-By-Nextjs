"use client"

import qs from "query-string";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CategoryItem = ({label,value,icon:Icon})=>{
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()

    const cCId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")
    const isSelected =  cCId === value;

    const onClick = () =>{
        const url = qs.stringifyUrl({
            url:pathname,
            query:{
                title: currentTitle,
                categoryId : isSelected ? null : value,
            }
        },{skipNull : true, skipEmptyString: true});
        router.push(url)
    }

    return (
        <Button onClick={onClick} type="button" className={`ml-[10px] py-2 mt-[20px] px-3 border border-slate-300 rounded-full flex items-center gap-x-1 hover:border-sky-600 transition ${isSelected && "border-sky-700 bg-sky-200 text-sky-800"}`}>
            {Icon &&  <Icon size={20} />}
            <div className="truncate">
               {label}
            </div>
        </Button>
        )
}