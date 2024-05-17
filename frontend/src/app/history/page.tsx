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
import { getHistory } from "@/actions/historyActions";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Page = async ({ searchParams }: { searchParams: { page?: number } }) => {
  const { page } = searchParams;

  const { formattedData, isNext } = await getHistory({
    size: 10,
    pageNumber: page,
  });

  return (
    <section className="my-10 container">
      <h2 className="text-2xl my-2">Phishing History</h2>
      <Table>
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
      <Pagination>
        <PaginationContent>
          {page && page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/history?page=${+page - 1}`} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href={`/history?page=${page ? +page : 1}`}>
              {page ? page : 1}
            </PaginationLink>
          </PaginationItem>

          {isNext && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`/history?page=${page ? +page + 1 : 2}`}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Page;
