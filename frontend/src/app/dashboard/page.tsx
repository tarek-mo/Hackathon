import axios from "@/axios";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

const Page = async () => {
  const response = await axios.get("/inbox");
  console.log(response.data);


  return (
    <div className="container">
      dashboard
      
      {response.data}
    </div>
  );
};

export default Page;