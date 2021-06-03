import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
        <div className="menu-bar row justify-content-center">
          <Menu />         
        </div>
        <hr className="page-title-separator" />
        <div className="row justify-content-center">
          <Routes />
        </div>
    </div>
  );
}

export default Layout;
