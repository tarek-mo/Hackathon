import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RecentlyCheckedTable = () => {
  return (
    <section className="my-10">
      <h2 className="text-2xl my-2">Recently Checked</h2>
      <Table>
        <TableCaption className="">
          <Link
            className="flex items-center justify-center gap-3"
            href={"/stats"}
          >
            View All <ArrowRight size={18} />
          </Link>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ressource</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>http://565bet.com/</TableCell>
            <TableCell>Website</TableCell>
            <TableCell className="font-medium">BAD</TableCell>
            <TableCell>5 minutes ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>itistarek@gmail.com</TableCell>
            <TableCell>Email</TableCell>
            <TableCell className="font-medium">BAD</TableCell>
            <TableCell>an hour ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>https://plenasupport.pages.dev/dapps</TableCell>
            <TableCell>Website</TableCell>
            <TableCell className="font-medium">BAD</TableCell>
            <TableCell>a day ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>mohammelachhab@gmail.com</TableCell>
            <TableCell>Email</TableCell>
            <TableCell className="font-medium">GOOD</TableCell>
            <TableCell>an hour ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>itistarek@gmail.com</TableCell>
            <TableCell>Email</TableCell>
            <TableCell className="font-medium">BAD</TableCell>
            <TableCell>an hour ago</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default RecentlyCheckedTable;
