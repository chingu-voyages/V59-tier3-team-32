"use client";
import GithubIcon from "@/components/icons/GithubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AuthType = "login" | "signup";

const AuthDialog = ({
  authType,
  children,
}: {
  authType: AuthType;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="border-0 rounded-sm bg-[#161c2f]">
        <div className="py-16 px-8 flex flex-col items-center gap-y-8">
          <DialogHeader className="flex flex-col gap-y-4">
            <DialogTitle className="text-center text-2xl">
              {authType === "login" ? "Sign in" : "Sign up"}
            </DialogTitle>
            <p className="text-sm text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
              quisquam asperiores sed? Dolor, alias.
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-y-6 max-w-xs">
            <Button className="hover:bg-accent cursor-pointer px-6 py-5">
              <GithubIcon />
              <span className="pl-2">
                {authType === "login" ? "Sign in" : "Sign up"} with Github
              </span>
            </Button>
            <Button
              variant={"outline"}
              className="border-primary hover:bg-slate-900 cursor-pointer px-6 py-5"
            >
              <GoogleIcon />
              <span className="pl-2">
                {authType === "login" ? "Sign in" : "Sign up"} with Google
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
