import React from "react";

import { ModeToggle } from "./mode-toggle";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between max-w-5xl mx-auto p-3">
      <h2>Hackaton</h2>
      <ModeToggle />
    </nav>
  );
};

export default Nav;
