"use client";
import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import axios from "@/axios";
import { createClient } from "@/utils/supabase/client";

const PermissionDenied = () => {
  const supabase = createClient();
  const storeCredentials = async () => {
    const obj = await supabase.auth.getSession();
    console.log(obj.data.session);
    const { session } = obj.data;

    // Assuming you have the credentials object ready
    const credentials = {
      token: session?.provider_token,
      refresh_token: session?.refresh_token,
    };

    const response = await axios.post("/store-credentials", credentials);
    return response;
  };
  const handleGrantPermission = async () => {
    const response = await axios.get("/authorize");
    const url = response.data.auth_url;
    // open the url

    window.open(url, "_self");
    await storeCredentials();
  };

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Permission Denied</AlertTitle>
      <AlertDescription>
        Please grant permission to your google account to get metrics about your
        inbox and phishing emails.
      </AlertDescription>
      <Button
        onClick={handleGrantPermission}
        className="mt-4"
        variant={"default"}
      >
        Grant Permission
      </Button>
    </Alert>
  );
};

export default PermissionDenied;
