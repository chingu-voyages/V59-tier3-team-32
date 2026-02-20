"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import AuthDialog from "./AuthDialog";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#161c2f]">
      <nav
        aria-label="Main navigation"
        className="flex justify-between items-center p-4 text-[20px] xl:max-w-[85%] md:w-[90%] mx-auto"
      >
        <Link href="/" aria-label="Home - Logo">
          <Image src="/icons/logo.svg" alt="Logo" width={150} height={150} />
        </Link>
        <div className="  hidden lg:flex space-x-12 items-center justify-between w-full xl:pl-48">
          <CurrentDate />
          <ul role="list" className="flex space-x-12 ">
            <li>
              <Link
                href="/"
                className={`font-semibold hover:text-primary active:text-primary ${pathname === "/" ? "text-primary" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/roles"
                className={`font-semibold hover:text-primary active:text-primary ${pathname === "/roles" ? "text-primary" : ""}`}
              >
                Roles
              </Link>
            </li>
          </ul>

          <AuthLinks />
        </div>
        <HamburgerMenu pathname={pathname} />
      </nav>
    </header>
  );
};

const CurrentDate = () => {
  const now: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate: string = now.toLocaleDateString("en-us", options);
  return <div className="font-semibold ml-20">{formattedDate}</div>;
};

const AuthLinks = () => {
  return (
    <div className="flex space-x-6 items-center">
      <AuthDialog authType="login">
        <p className="hover:underline cursor-pointer">Log in</p>
      </AuthDialog>
      <AuthDialog authType="signup">
        <p className="px-8 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent cursor-pointer">
          Sign Up
        </p>
      </AuthDialog>
    </div>
  );
};

const HamburgerMenu = ({ pathname }: { pathname: string }) => {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-muted-foreground font-semibold hover:text-primary">
          <Menu size={28} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[#161c2f] border-[#161c2f] lg:hidden"
        >
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className={` ${pathname === "/" ? "text-primary" : ""}`}
            >
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/tests"
              className={` ${pathname === "/tests" ? "text-primary" : ""}`}
            >
              Tests
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/login" className="">
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/signup" className="">
              Sign Up
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
