import { cn } from "@/lib/utils";
import Image from "next/image";

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
      className="p-4 lg:py-[25px] md:px-[60px] lg:px-0 flex flex-col md:grid md:grid-cols-2 lg:col-span-[524px] 
    items-center justify-between space-y-12 lg:gap-2.5 lg:pt-[107px] md:mx-auto lg:max-w-[85%]"
    >
      <div className="w-full max-w-[524px] lg:space-y-8 space-y-6 text-center lg:text-left">
        <h1 className="font-semibold text-4xl lg:text-[40px] text-primary leading-snug">
          Master your interview skills
        </h1>
        <p className="lg:text-[18px]">
          Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan.
        </p>
        <a href="" className="px-3 py-3 bg-[#B256FC] rounded-sm">
          Test your knowledge
        </a>
      </div>
      <Image
        src="/hero_illustration.svg"
        alt="Hero Image"
        className="md:ml-auto max-w-[300px] lg:max-w-none"
        width={500}
        height={554}
      />
    </section>
  );
};

const About = () => {
  return (
    <section className="space-y-16 lg:space-y-30 relative overflow-hidden pb-20 lg:pb-42">
      <Image
        src="/circle_loop.svg"
        alt="About Background"
        className="absolute top-0 left-0 lg:-mt-76 -z-0"
        width={1200}
        height={1200}
      />

      <SectionHeading
        text="Why Choose Confido?"
        className="lg:pt-52.25 pt-20"
      />

      <div className="flex flex-col lg:flex-row space-y-10 lg:space-x-10 z-1 md:mx-auto lg:max-w-[85%] px-4 lg:px-0">
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
    <section className="bg-[#1a0238]">
      <SectionHeading text="How it works" className="" />
    </section>
  );
};

const Explore = () => {
  return (
    <section>
      <SectionHeading text="Explore roles" className="" />
    </section>
  );
};

const SectionHeading = ({
  text,
  className,
}: {
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
      <h2 className="lg:text-[48px] text-5xl text-primary font-semibold px-4 text-center md:text-left md:px-0">
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
