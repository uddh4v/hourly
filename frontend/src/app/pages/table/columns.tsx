/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Badge } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDemo } from "@/components/ui/date-picker";

import { Input } from "@/components/ui/input";
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
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
  IconLoader,
} from "@tabler/icons-react";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  // taskDescription: string; //
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Payment>[] = [
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
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("date");

      // Safely parse the date
      const date = rawDate ? new Date(rawDate as string) : undefined;

      return (
        <DatePickerDemo
          value={date}
          onChange={(newDate) => {
            console.log("New date for row:", row.id, newDate);
            // You can add saving logic here if needed
          }}
        />
      );
    },
  },
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
        value={row.getValue("text")}
        onChange={(e) => row.getValue("text", e.target.value)}
        className=" w-[50px]"
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: any) => (
      <Textarea
        value={row.getValue("text")}
        onChange={(e) => row.getValue("text", e.target.value)} // Handle email update logic here
        className="lowercase w-[300px]"
        rows={2} // Adjust the number of rows for the Textarea
      />
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleSend = () => {
        const rowData = row.original;
        // Add your send logic here
        console.log("Sending:", rowData);
      };

      return (
        <Button variant="destructive" onClick={handleSend}>
          Delete
        </Button>
      );
    },
  },
];
