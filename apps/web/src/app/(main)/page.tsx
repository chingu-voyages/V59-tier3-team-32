import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const aboutUs = [
  {
    icon: "/icons/checkmark.svg",
    title: "honest",
    description:
      "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Clh",
  },
  {
    icon: "/icons/peace.svg",
    title: "powerful results",
    description:
      "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Clh",
  },
  {
    icon: "/icons/handshake.svg",
    title: "smarter preparation",
    description:
      "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Clh",
  },
];

export default function Home() {
  return (
    <main className="bg-[#0f1425]">
      <Hero />
      <About />
      <Process />
      <Explore />
    </main>
  );
}

const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="p-4 lg:py-6.25 md:px-15 lg:px-0 flex flex-col md:grid md:grid-cols-2 lg:col-span-[524px] 
    items-center justify-between space-y-12 lg:gap-2.5 lg:pt-26.75 md:mx-auto lg:max-w-[85%]"
    >
      <div className="w-full max-w-131 lg:space-y-8 space-y-6 text-center lg:text-left">
        <h1
          id="hero-heading"
          className="font-semibold text-4xl lg:text-[40px] text-primary leading-snug"
        >
          Master your interview skills
        </h1>
        <p className="lg:text-[18px]">
          Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan.
        </p>
        <Link
          href="/questions"
          aria-label="Start interview knowledge test"
          className="px-3 py-3 bg-[#B256FC] rounded-sm"
        >
          Test your knowledge
        </Link>
      </div>

      <Image
        src="/hero_illustration.svg"
        alt="Hero Image"
        className="md:ml-auto max-w-75 lg:max-w-none"
        width={500}
        height={554}
      />
    </section>
  );
};

const About = () => {
  return (
    <section
      aria-labelledby="about-heading"
      className="space-y-16 lg:space-y-30 relative overflow-hidden pb-20 lg:pb-42"
    >
      <Image
        src="/circle_loop.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 lg:-mt-76 z-0"
        width={1200}
        height={1200}
      />

      <SectionHeading
        id="about-heading"
        text="Why Choose Confido?"
        className="lg:pt-52.25 pt-20"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 space-y-10 lg:space-y-0 lg:space-x-10 z-1 md:mx-auto lg:max-w-[85%] px-4 lg:px-0">
        {aboutUs.map((item, index) => (
          <div
            key={index}
            className="bg-[#161c2f] rounded-sm py-10 px-6 flex flex-col items-center space-y-4
             text-center z-1 hover:ring-1 ring-primary hover:drop-shadow-[#b256fc] hover:drop-shadow-md "
          >
            <Image
              src={item.icon}
              alt={item.title}
              className="w-12.5 h-12.5"
              width={50}
              height={50}
            />
            <h3 className="text-[28px] font-semibold 3xl:text-4xl capitalize">
              {item.title}
            </h3>
            <p className="3xl:text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section aria-labelledby="process-heading" className="bg-[#1a0238]">
      <SectionHeading id="process-heading" text="How it works" className="" />
    </section>
  );
};

const Explore = () => {
  return (
    <section
      aria-labelledby="explore-heading"
      className="py-20 space-y-16 lg:space-y-30 flex flex-col items-center justify-center "
    >
      <SectionHeading id="explore-heading" text="Explore roles" className="" />

      <ul className="px-4 md:mx-auto lg:max-w-[85%] lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-x-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="flex flex-col py-9 px-16.5 rounded-md items-center  justify-center space-y-6 hover:ring-1 
            ring-primary "
            style={{
              background:
                "linear-gradient(180deg, #AA14F0 -42.59%, rgba(0, 0, 0, 0) -42.59%, #CB8DE8 -42.58%, rgba(203, 143, 232, 0.18) 4.35%, rgba(151, 60, 68, 0.055) 99.99%, rgba(199, 137, 228, 0) 100%)",
            }}
          >
            <h3 className="text-[24px] text-center">UI/UX Designer</h3>
            <Image
              src="/role.svg"
              alt="UI/UX Designer"
              width={122}
              height={101}
            />
          </li>
        ))}
      </ul>

      <Link
        href="/roles"
        className="text-[16px] text-primary font-semibold text-center "
      >
        View more roles <ArrowRight className="inline-block ml-2" />
      </Link>
    </section>
  );
};

const SectionHeading = ({
  id,
  text,
  className,
}: {
  id: string;
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center justify-center z-1  md:mx-auto lg:max-w-[85%]",
        className,
      )}
    >
      <h2
        id={id}
        className="lg:text-[48px] text-5xl text-primary font-semibold px-4 text-center md:text-left md:px-0"
      >
        {text}
      </h2>

      <Image
        src="/about_stars.svg"
        alt="About Image"
        width={174}
        height={102}
        className=""
      />
    </div>
  );
};
