"use server";

import formatDate from "@/utils/formatDate";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const supabase = createClient(cookies());

type GetHistoryParams = {
  size?: number;
  pageNumber?: number;
};
export const getHistory = async (params: GetHistoryParams) => {
  const { pageNumber = 1, size = 5 } = params;
  const { data, error } = await supabase
    .from("history")
    .select("*")
    // skip records
    .range((pageNumber - 1) * size, pageNumber * size - 1)
    .limit(size)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }

  const { count: totalRecords } = await supabase
    .from("history")
    .select("*", { count: "exact", head: true });
  const isNext = totalRecords ? totalRecords > pageNumber * size : false;
  const formattedData = data.map((record) => ({
    id: record.id,
    created_at: formatDate(record.created_at),
    user_id: record.user_id,
    type: record.type,
    status: record.status,
    ressource: record.ressource,
  }));

  // Send response
  return { formattedData, isNext };
};
