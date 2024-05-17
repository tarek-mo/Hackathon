import LastEmail from "@/components/last-email";
import PermissionDenied from "@/components/permission-denied";
import React from "react";

const Page = () => {
  return (
    <div className="container">
      <PermissionDenied />
      <LastEmail />
    </div>
  );
};

export default Page;
