import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  return (
    <section
      className="flex flex-col gap-8 py-8"
      aria-labelledby="team-members"
    >
      <h2 id="team-members" className="text-xl text-center">
        Team Members
      </h2>

      <ul className="flex flex-wrap justify-center gap-9">
        {members.map((member) => (
          <li key={member.href}>
            <Member member={member} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Member({ member }: { member: Member }) {
  return (
    <a href={member.href} target="_blank" rel="noopener noreferrer">
      <figure className="flex flex-col items-center gap-2">
        <Avatar className="w-18 h-18">
          <AvatarImage src={member.src} alt="" />
          <AvatarFallback aria-hidden>{member.name[0]}</AvatarFallback>
        </Avatar>
        <figcaption className="text-center flex flex-col gap-1">
          <p>{member.name}</p>
          <p className="text-primary text-sm font-light">{member.role}</p>
        </figcaption>
      </figure>
    </a>
  );
}

interface Member {
  href: string;
  src: string;
  name: string;
  role: string;
}
