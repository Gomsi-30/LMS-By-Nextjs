import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Image src="/b.jpg" alt="education" layout="fill" objectFit="cover" />
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-8xl ml-[600px] font-bold text-blue-600  bg-opacity-75 p-2 rounded">
         KEEP LEARNING
        </h1>
      </div>
    </div>
  );
}
    