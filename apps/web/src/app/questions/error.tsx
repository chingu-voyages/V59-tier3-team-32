"use client";
import WarningIcon from "@/components/icons/WarningIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="px-4 min-h-screen flex flex-col gap-y-6 justify-center mx-auto max-w-2xl">
      <section className="flex flex-col gap-y-8 items-center justify-center">
        <WarningIcon />
        <p>An unexpected error occured: {error.message}</p>
      </section>
      <nav className="flex gap-x-4 justify-center">
        <Link href={"/"}>
          <Button className="p-5 bg-[#7CA8F9]">Go home</Button>
        </Link>
        <Link href={"/roles"}>
          <Button variant={"outline"} className="p-5">
            See roles
          </Button>
        </Link>
      </nav>
    </main>
  );
}
