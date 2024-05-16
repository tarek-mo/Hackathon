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
import { getHistory } from "@/actions/historyActions";

const RecentlyCheckedTable = async () => {
  const { formattedData } = await getHistory({});
  return (
    <section className="my-10">
      <h2 className="text-2xl my-2">Recently Checked</h2>
      <Table>
        <TableCaption className="">
          <Link
            className="flex items-center justify-center gap-3"
            href={"/history"}
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
          {formattedData.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.ressource}</TableCell>
              <TableCell className="capitalize">{record.type}</TableCell>
              <TableCell
                className={`font-medium capitalize ${
                  record.status === "good" ? "text-green-500" : "text-red-500"
                }`}
              >
                {record.status === "good" ? "safe" : "unsafe"}
              </TableCell>
              <TableCell>{record.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default RecentlyCheckedTable;
