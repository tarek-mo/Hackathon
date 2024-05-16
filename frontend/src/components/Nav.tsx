import React from "react";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Authentication from "./authentication";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between container py-3">
      <h2>PhishGuard</h2>
      <div className="flex items-center gap-3">
        <Authentication />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
