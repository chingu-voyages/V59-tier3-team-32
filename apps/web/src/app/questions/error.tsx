"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="px-4 min-h-screen flex flex-col gap-y-6 items-center justify-center mx-auto max-w-2xl">
      <p>An unexpected error occured: {error.message}</p>
      <div className="flex gap-x-4">
        <Link href={"/"}>
          <Button className="p-5">Go home</Button>
        </Link>
        <Link href={"/roles"}>
          <Button variant={"outline"} className="p-5">
            See roles
          </Button>
        </Link>
      </div>
    </div>
  );
}
