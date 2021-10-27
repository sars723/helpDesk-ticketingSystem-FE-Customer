import React from "react";
import TopHeader from "./headers/TopHeader";
import MiddleHeader from "./headers/MiddleHeader";
import BottomHeader from "./headers/BottomHeader";
import "./Header.css";
import { withRouter } from "react-router";
const Header = ({ searchQuery, setSearchQuery, location }) => {
  return (
    <div className="header">
      <TopHeader />
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <>
          <MiddleHeader
          /*  searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} */
          />
          <BottomHeader />
        </>
      )}
    </div>
  );
};

export default withRouter(Header);
