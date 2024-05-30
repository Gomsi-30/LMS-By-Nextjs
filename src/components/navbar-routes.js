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
     
      {isTeacherPage || isPlayerPage && (
        <Link href="/">
          <Button>
            <LogOut></LogOut>
          </Button>
        </Link>
      ) }
    </div>
    </>
  );
};

export default NavbarRoutes;
