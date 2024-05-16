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

const Authentication = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Login</DialogTitle>
            <DialogDescription>
              <Button className="flex items-center gap-3 w-full">
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
      <Dialog>
        <DialogTrigger asChild>
          <Button>Signup</Button>
        </DialogTrigger>{" "}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Signup</DialogTitle>
            <DialogDescription>
              <Button className="flex items-center gap-3 w-full">
                <Image
                  src="/images/google-logo.png"
                  alt="Google Logo"
                  width={25} // Specify the actual width of the image
                  height={25} //
                />
                Signup with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Authentication;
