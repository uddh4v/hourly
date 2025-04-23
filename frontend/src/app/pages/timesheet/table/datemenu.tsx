import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";

// Define the type for the items in the array
interface WeekDay {
  dayOfWeek: string;
  date: number;
  fullDate: Date;
  isDisabled: boolean;
}

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatFullDate = (date: Date) => {
  const day = date.getDate();
  const monthName = date.toLocaleString("en-us", { month: "long" });
  const year = date.getFullYear();
  return `${monthName} ${day}${getOrdinalSuffix(day)}, ${year}`;
};

const WeekDisplay = () => {
  const [currentWeek, setCurrentWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + 1);

    const weekDays = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);

      const isFutureDate =
        day.getDate() > todayDate &&
        day.getMonth() === currentMonth &&
        day.getFullYear() === currentYear;

      return {
        dayOfWeek: day.toLocaleString("en-us", { weekday: "short" }),
        date: day.getDate(),
        fullDate: day,
        isDisabled: isFutureDate,
      };
    });

    setCurrentWeek(weekDays);
  }, []);

  const handleClick = (day: WeekDay) => {
    const formattedDate = formatFullDate(day.fullDate);
    alert(`You clicked on ${formattedDate}`);
    console.log("Clicked Day:", day);
  };

  return (
    <div className="flex h-5 items-center space-x-4 text-sm pl-2">
      {currentWeek.map((day, index) => (
        <React.Fragment key={index}>
          <div
            className={`${
              day.isDisabled
                ? "text-gray-400 dark:text-gray-600"
                : "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white"
            }`}
            style={{
              pointerEvents: day.isDisabled ? "none" : "auto",
              padding: "5px",
              borderRadius: "4px",
            }}
            onClick={() => !day.isDisabled && handleClick(day)}
          >
            {day.dayOfWeek} {day.date}
          </div>
          {index < currentWeek.length - 1 && (
            <Separator orientation="vertical" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeekDisplay;
