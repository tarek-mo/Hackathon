"use client";
import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Logout = () => {
  const supabase = createClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut({});
    router.refresh();
  };
  return (
    <Button variant={"secondary"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
