import { CalendarDays } from "lucide-react";
import DisplayImage from "@/assets/nordwood-themes-bp1ydkAtwFI-unsplash.jpg"
import DisplayImage1 from "@/assets/alex-lvrs-2zDw14yCYqk-unsplash.jpg";

import { LoginForm } from "@/app/pages/login/loginForm";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [currentImage, setCurrentImage] = useState<string>(DisplayImage);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prevImage) => {
        if (prevImage === DisplayImage) {
          return DisplayImage1;
          // } else if (prevImage === DisplayImage1) {
          //   return DisplayImage2;
        } else {
          return DisplayImage; // loop back to the first image
        }
      });
    }, 10000); // 5000 ms = 5 seconds

    return () => clearInterval(imageInterval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-bold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <CalendarDays className="size-4" />
            </div>
            Hourly
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={currentImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-bottom dark:brightness-[0.2] dark:grayscale]"
        />
      </div>
    </div>
  );
}
