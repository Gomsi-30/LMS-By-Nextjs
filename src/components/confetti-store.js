"use client"

import ReactConfetti from "react-confetti"
import {Useconfetti}  from "@/hooks/use-confetti"
export const Confettistore = ()=>{
    const confetti = Useconfetti();

    if(!confetti.isOpen) return null;

    return (
        <ReactConfetti
           className="pointer-events-none z-[100]"
           numberOfPieces={500}
           recycle={false}
           onConfettiComplete={()=>{
           confetti.onClose()
        }} />
    )
}