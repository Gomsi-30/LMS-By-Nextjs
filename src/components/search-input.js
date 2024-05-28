"use client"

import qs from "query-string";
import  {Search} from "lucide-react"
import {Input} from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce";
import { GetProgress } from "@/actions/get-progress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchInput = ()=>{
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value)

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId")

    useEffect(()=>{
      const url = qs.stringifyUrl({
        url:pathname,
        query: {
            categoryId: currentCategoryId,
            title:debounceValue,
        }
      },{skipNull : true, skipEmptyString: true})

      router.push(url)
    },[debounceValue, currentCategoryId, router, pathname])
    
      return (
        <div className="relative">
          <GetProgress /> 
          <Search className="h-4 w-4 absolute top-3 left-3 text-slate-400" />
          <Input placeholder="Search for courses" onChange={(e)=>setValue(e.target.value)} className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" />
        </div>
      )
}