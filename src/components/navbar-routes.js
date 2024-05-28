"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { BookAIcon, CircleUserRound, LogOut, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { SearchInput } from "./search-input";

const NavbarRoutes = () => {
  const path = usePathname();
  const isTeacherPage = path.startsWith("/teacher");
  const isPlayerPage = path.includes("/chapter");
  const isSearchPage = path.includes("/search");


  return (
    <>
    {isSearchPage && (
      <div>
        <SearchInput />
      </div>
    )}
    <div className="flex items-center">
     
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button>
            <LogOut></LogOut>
          </Button>
        </Link>
      ) : (
        <div className="bg-blue-100 w-[175px] rounded-l-[10px] gap-3 flex items-center justify-center h-[34px]">
        <Link href="/teacher/courses">
          {/* <Button>
            <h1 className="text-1xl font-semibold">Teacher Mode</h1>
            <BookAIcon className="ml-[5px]"/>
          </Button> */}
        </Link>
        </div>
      )}
    </div>
    </>
  );
};

export default NavbarRoutes;
