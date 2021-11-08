import React, { useState } from "react";
import { useHistory } from "react-router";
import NavBar from "../navbar/NavBar";
import Sidebar from "../sidebar/Sidebar";

export default function Header() {
  const history = useHistory();
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  const token = window.localStorage.getItem("Token");

  return (
    <>
      {token === null ? (
        history.push("/login")
      ) : (
        <>
          <NavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          <div>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          </div>
        </>
      )}
    </>
  );
}
