/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Badge } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { DatePickerDemo } from "@/components/ui/date-picker";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  IconBug,
  IconCircleCheckFilled,
  IconCode,
  IconExclamationCircleFilled,
  IconFlask,
  IconLoader,
  IconMessagePlus,
  IconTools,
  IconUsers,
} from "@tabler/icons-react";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export type Timesheet = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  // taskDescription: string; //
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns = (
  setData: React.Dispatch<React.SetStateAction<Timesheet[]>>
): ColumnDef<Timesheet>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "date",
  //   header: "Date",
  //   cell: ({ row }) => {
  //     const rawDate = row.getValue("date");

  //     // Safely parse the date
  //     const date = rawDate ? new Date(rawDate as string) : undefined;

  //     return (
  //       <DatePickerDemo
  //         value={date}
  //         onChange={(newDate) => {
  //           console.log("New date for row:", row.id, newDate);
  //           // You can add saving logic here if needed
  //         }}
  //       />
  //     );
  //   },
  // },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      const currentValue = row.getValue("project") as string | undefined;

      return (
        <Select
          value={currentValue}
          onValueChange={(newValue) => {
            console.log("Selected project for row", row.id, ":", newValue);
            // Optionally persist the change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Projects</SelectLabel>
              <SelectItem value="apple">GroupM</SelectItem>
              <SelectItem value="banana">Automation</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => {
      const currentValue = row.getValue("project") as string | undefined;

      return (
        <Select
          value={currentValue}
          onValueChange={(newValue) => {
            console.log("Selected project for row", row.id, ":", newValue);
            // Optionally persist the change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Task</SelectLabel>
              <SelectItem value="development">
                <IconCode className="mr-2 h-4 w-4" />
                Development
              </SelectItem>
              <SelectItem value="meeting">
                <IconUsers className="mr-2 h-4 w-4" />
                Meeting
              </SelectItem>
              <SelectItem value="testing">
                <IconTools className="mr-2 h-4 w-4" />
                Testing
              </SelectItem>
              <SelectItem value="research">
                <IconFlask className="mr-2 h-4 w-4" />
                Research
              </SelectItem>
              <SelectItem value="bug-fix">
                <IconBug className="mr-2 h-4 w-4" />
                Bug fix
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const currentValue = row.getValue("project") as string | undefined;

      return (
        <Select
          value={currentValue}
          onValueChange={(newValue) => {
            console.log("Selected project for row", row.id, ":", newValue);
            // Optionally persist the change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Projects</SelectLabel>
              <SelectItem value="apple">
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  {/* <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" /> */}
                  <IconLoader />
                  In progress
                </Badge>
              </SelectItem>
              <SelectItem value="mango">
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  {/* <IconLoader /> */}
                  Completed
                </Badge>
              </SelectItem>
              <SelectItem value="banana">
                <Badge
                  variant="outline"
                  className="text-muted-foreground px-1.5"
                >
                  <IconExclamationCircleFilled className="fill-red-500 dark:fill-red-400" />
                  {/* <IconLoader /> */}
                  Blocker
                </Badge>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "timespend",
    header: "Time",
    cell: ({ row }: any) => (
      <Input
        value={row.getValue("timespend")}
        onChange={(e) => row.getValue("timespend", e.target.value)}
        className=" w-[50px]"
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false);
      const value = row.getValue("description");

      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Ideally you'd update the data here, maybe with row.original or a callback
        console.log("Updated value:", e.target.value);
      };

      return (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <IconMessagePlus
                stroke={2}
                className="ml-6 cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </PopoverTrigger>
            <PopoverContent
              className="w-[320px] p-2" // Set a width and padding
              sideOffset={8} // Optional: adds spacing between trigger and popover
            >
              <div className="grid w-full gap-2">
                <Textarea
                  value={value}
                  onChange={handleChange}
                  className="lowercase w-full resize-none" // Make it full width and prevent resizing
                  rows={3}
                />
                <Button>Send message</Button>
              </div>
            </PopoverContent>
          </Popover>
        </>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleDelete = () => {
        const idToDelete = row.original.id;

        // ✅ Use setData to remove the row by ID
        setData((prev) => prev.filter((item) => item.id !== idToDelete));
      };
      return (
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 />
        </Button>
      );
    },
  },
];
