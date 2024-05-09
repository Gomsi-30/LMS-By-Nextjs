"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { CircleUserRound, LogOut } from "lucide-react";

const NavbarRoutes = () => {
  const path = usePathname();
  const isTeacherPage = path.startsWith("/teacher");
  const isPlayerPage = path.includes("/chapter");
  return (
    <div className="flex items-center">
      <Button>
        <CircleUserRound />
      </Button>
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button>
            <LogOut></LogOut>
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button>
            Teacher Mode
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarRoutes;
