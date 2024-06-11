
import { auth } from "@/auth";
import NavbarRoutes from "@/components/navbar-routes";

import { Input } from "@/components/ui/input";
import { CircleUserIcon, CircleUserRoundIcon, SearchIcon } from "lucide-react";
import Image from "next/image";

const Navbar = async() => {
  const session = await auth()

  // console.log(session.user.email)
  return (
    <div className=" flex z-[50] items-center px-[10px] h-[70px] bg-gradient-to-r from-cyan-500 to-blue-500 ...">
      
      <div className="flex items-center ml-2 border border-transparent outline-none">
        {/* <Input
          className="outline-none h-11 w-[530px]  rounded-l-[10px]"
          type="text"
          placeholder="Search courses here..."
        /> */}
        {/* <div className="bg-black h-11 w-[42px] flex justify-center items-center  rounded-r-[10px]">
          <SearchIcon className="text-white " size={28} />
        </div> */}
      </div>
      <div className="flex items-center gap-3 mr-[30px] ml-auto">
      <NavbarRoutes />
      <div className="bg-blue-100 rounded-l-[10px] w-[180px] flex items-center justify-center h-[34px]">
    {session.user ? <i className="font-medium text-1xl">{session.user.name}</i> : "" }
      </div>
      
   <CircleUserRoundIcon />
       
      </div>
    </div>
  );
};

export default Navbar;

