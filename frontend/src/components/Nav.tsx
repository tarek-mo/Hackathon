import React from "react";
import { cookies } from "next/headers";

import { ModeToggle } from "./mode-toggle";
import Authentication from "./login";
import { createClient } from "@/utils/supabase/server";
import Logout from "./logout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Nav = async () => {
  const supabase = createClient(cookies());
  // get supabase current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between container py-3">
      <h2 className="text-2xl">
        <Link href={"/"}>PhishGuard</Link>
      </h2>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            <Image
              src={user.user_metadata.avatar_url}
              width={50}
              height={50}
              className="rounded-full"
              alt="Avatar"
            />
            <p className="text-sm text-muted-foreground">
              {user?.user_metadata.full_name}
            </p>
            <Button
              className="underline cursor-pointer"
              asChild
              variant={"ghost"}
            >
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            <Logout />
          </div>
        ) : (
          <Authentication />
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
