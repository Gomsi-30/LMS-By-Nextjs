import {create} from "zustand"

export const Useconfetti = create((set)=>({
   isOpen:false,
   onOpen:()=>set({isOpen:true}),
   onClose:()=>set({isOpen:false})
}))