"use client";

import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import members from "./members.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-popover w-full">
      <MembersList members={members} />

      <div className="font-light flex flex-wrap justify-between items-center px-29.5 py-3.5">
        <address>
          Built by{" "}
          <a
            className="font-bold underline"
            href="https://github.com/chingu-voyages/v59-tier3-team-32"
            target="_blank"
            rel="author noopener noreferrer"
          >
            v59-tier3-team-32 - Chingu
          </a>
        </address>
        <small className="text-base flex items-center gap-2.25 m-0">
          <span className="flex items-center gap-0.5">
            <span className="text-xl font-normal">&copy;</span>
            <time dateTime={`${currentYear}-01-01`}>{currentYear}</time>
          </span>{" "}
          All rights reserved
        </small>
      </div>
    </footer>
  );
}

function MembersList({ members }: { members: Member[] }) {
  const [startIndex] = useState(() =>
    Math.floor(Math.random() * members.length),
  );

  return (
    <section
      className="flex flex-col gap-8 py-8"
      aria-labelledby="team-members"
    >
      <h2 id="team-members" className="text-xl text-center">
        Team Members
      </h2>

      <ul className="w-[calc(100% - 4.5rem)] mx-16">
        <Carousel
          plugins={[Autoplay()]}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: true,
            slidesToScroll: "auto",
            startIndex,
          }}
        >
          <CarouselPrevious variant="ghost" />
          <CarouselNext variant="ghost" />
          <CarouselContent className="-ml-9" aria-live="polite">
            {members.map((member) => (
              <CarouselItem
                key={member.href}
                className="pl-9 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <li className="w-max mx-auto">
                  <Member member={member} />
                </li>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ul>
    </section>
  );
}

function Member({ member }: { member: Member }) {
  return (
    <figure className="w-max whitespace-nowrap">
      <a
        className="flex flex-col items-center gap-2"
        href={member.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar className="w-18 h-18">
          <AvatarImage src={member.src} alt="" />
          <AvatarFallback aria-hidden>{member.name[0]}</AvatarFallback>
        </Avatar>
        <figcaption className="text-center flex flex-col gap-1">
          <p>{member.name}</p>
          <p className="text-primary text-sm font-light">{member.role}</p>
        </figcaption>
      </a>
    </figure>
  );
}

interface Member {
  href: string;
  src: string;
  name: string;
  role: string;
}
