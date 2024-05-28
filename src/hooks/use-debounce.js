
"use client"
import {useEffect, useState} from "react"

export function useDebounce(value,delay){
      const [debounceValue, setdebounceValue] = useState(value)

      useEffect(()=>{
        const timer = setTimeout(()=> {
            setdebounceValue(value)
        },delay || 500);

        return ()=>{
            clearTimeout(timer)
        }
      },[value,delay])

      return debounceValue;
}