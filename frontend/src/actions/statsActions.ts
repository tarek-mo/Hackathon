"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const supabase = createClient(cookies());

export const getTotalUrlsChecked = async () => {
  const { count, error } = await supabase
    .from("history")
    .select("*", { count: "exact", head: true }) // if you don't want to return any rows, you can use { count: 'exact', head: true }
    .eq("type", "website");

  if (error) {
    throw new Error(error.message);
  }

  return count;
};
export const getTotalEmailsChecked = async () => {
  const { count, error } = await supabase
    .from("history")
    .select("*", { count: "exact", head: true }) // if you don't want to return any rows, you can use { count: 'exact', head: true }
    .eq("type", "email");

  if (error) {
    throw new Error(error.message);
  }

  return count;
};
export const getDetectionRate = async () => {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("status", "bad");

  if (error) {
    throw new Error(error.message);
  }

  const { count, error: newError } = await supabase
    .from("history")
    .select("*", { count: "exact", head: true });
  if (newError) {
    throw new Error(newError.message);
  }
  if (!count) return 0;
  // if you don't want to return any rows, you can use { count: 'exact', head: true }

  const detectionRate = `${((data.length / count) * 100).toFixed(2)}%`;

  return detectionRate;
};
