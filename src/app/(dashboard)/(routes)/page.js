import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export default function Home() {

  return (
    <div>
       <h2 className="text-2xl font-bold text-blue-500">Welcome to home page</h2>
    </div>
  );
}
