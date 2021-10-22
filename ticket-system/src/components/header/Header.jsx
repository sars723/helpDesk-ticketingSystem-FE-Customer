import React from "react";
import TopHeader from "./headers/TopHeader";
import MiddleHeader from "./headers/MiddleHeader";
import BottomHeader from "./headers/BottomHeader";
import "./Header.css";
const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="header">
      <TopHeader />
      {window.location.pathname !== "/login" &&
      window.location.pathname !== "/register" ? (
        <>
          <MiddleHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <BottomHeader />
        </>
      ) : null}
    </div>
  );
};

export default Header;
