import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
// import { ChevronRightIcon } from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { useNavigate } from "react-router";
import DashboardPointer from "@/components/pointer/pointer-dashboard";
import { Lens } from "@/components/magicui/lens";
// import { Meteors } from "@/components/magicui/meteors";

export default function HeroSection() {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate("login");
  };
  return (
    <>
      {/* Hero */}
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 -z-10">
          <Particles />
          {/* <Meteors /> */}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 border text-sm p-1 ps-3 rounded-full transition"
              href="#"
            >
              PRO release - Join to waitlist
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Title */}
          <Lens defaultPosition={{ x: 260, y: 150 }}>
            <div className="mt-5 max-w-2xl text-center mx-auto">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                <SparklesText>
                  Let&apos;s Track <AuroraText>Together</AuroraText>
                </SparklesText>
              </h1>
            </div>
          </Lens>

          {/* Description */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-xl text-muted-foreground">
              Effortless time tracking that helps you stay organized, hit your
              goals, and simplify your workday—one hour at a time.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
            <Button size={"lg"} onClick={getStarted}>
              <DashboardPointer />
              Get started
            </Button>
            <Button size={"lg"} variant={"outline"}>
              Learn more
            </Button>
          </div>
        </div>
      </div>

      {/* End Hero */}
    </>
  );
}
