"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const Login = () => {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/",
      },
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Login</DialogTitle>
            <DialogDescription>
              <Button
                onClick={handleLogin}
                className="flex items-center gap-3 w-full"
              >
                <Image
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  width={25} // Specify the actual width of the image
                  height={25} //
                />
                Login with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
