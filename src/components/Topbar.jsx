import React from "react";
import { Grid, Bell, HelpCircle, Phone, Settings } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <h1 className="title">AccountCare</h1>

      {/* Search */}
      <div className="search-box">
        <input type="text" placeholder="Search" />
      </div>

      {/* Icons */}
      <div className="topbar-icons">
        <Grid />
        <Bell />
        <HelpCircle />
        <Phone />
        <Settings />
        <div className="avatar">S</div>
      </div>
    </header>
  );
}

export default Topbar;
