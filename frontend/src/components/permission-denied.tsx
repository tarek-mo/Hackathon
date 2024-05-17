"use client";
import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
const PermissionDenied = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Permission Denied</AlertTitle>
      <AlertDescription>
        Please grant permission to your google account to get metrics about your
        inbox and phishing emails.
      </AlertDescription>
      <Button className="mt-4" variant={"default"}>
        Grant Permission
      </Button>
    </Alert>
  );
};

export default PermissionDenied;
