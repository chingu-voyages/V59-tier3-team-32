"use client";
import HistoryIcon from "@/components/icons/HistoryIcon";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { User } from "better-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserNav = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: async () => {
          router.replace("/");
        },
        // onError: () => {
        // },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full cursor-pointer"
          aria-label="Open user menu"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.image ?? undefined}
              alt={`${user.name}'s profile picture`}
            />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2 border-0" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex items-center gap-1 p-4">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.image ?? undefined}
              alt={`${user.name}'s profile picture`}
            />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-1 p-2">
            <p className="text-sm leading-none font-medium pb-0.5">
              {user.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#0f1425]" />
        <DropdownMenuGroup className="py-0.5">
          <DropdownMenuItem className="px-3 py-2.5 cursor-pointer">
            <span className="pt-1" aria-hidden="true">
              <ProfileIcon />
            </span>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2.5 cursor-pointer">
            <span aria-hidden="true">
              <SettingsIcon />
            </span>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#0f1425]" />
        <DropdownMenuGroup className="py-0.5">
          <Link href={"/history"}>
            <DropdownMenuItem className="px-3 py-2.5 cursor-pointer">
              <span aria-hidden="true">
                <HistoryIcon />
              </span>
              History
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="px-3 py-2.5 cursor-pointer">
            <span aria-hidden="true">
              <NotificationsIcon />
            </span>
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#0f1425]" />
        <div className="flex items-center justify-center p-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className={`text-(--color-secondary) hover:text-(--color-secondary)
              border-(--color-secondary) bg-transparent hover:bg-transparent cursor-pointer px-8 py-4.5`}
          >
            Log out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
