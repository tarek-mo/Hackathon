import axios from "@/axios";
import LastEmail from "@/components/last-email";
import PermissionDenied from "@/components/permission-denied";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const Page = async () => {
  // const supabase = createClient(cookies());
  // const obj = await supabase.auth.getSession();
  // // Assuming you have the credentials object ready
  // const { session } = obj.data;

  // const credentials = {
  //   token: session?.provider_token,
  //   refresh_token: session?.refresh_token,
  // };
  // console.log(obj.data.session);
  const response = await axios.get("/check-credentials");
  const status = response.data.status;
  console.log("status", status);

  return (
    <div className="container">
      {status === "unauthorized" ? <PermissionDenied /> : <LastEmail />}
      {/* <PermissionDenied /> */}
    </div>
  );
};

export default Page;
