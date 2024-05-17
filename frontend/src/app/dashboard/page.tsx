import axios from "@/axios";
import LastEmail from "@/components/last-email";
import PermissionDenied from "@/components/permission-denied";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const Page = async () => {
  const supabase = createClient(cookies());
  const obj = await supabase.auth.getUser();

  const response = await axios.get("/check-credentials");
  const status = response.data.status;
  console.log("status", status);

  return (
    <div className="container">
      {status === "unauthorized" ? <PermissionDenied /> : <LastEmail />}
    </div>
  );
};

export default Page;
