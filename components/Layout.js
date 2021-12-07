import React from "react";

function Layout({ children }) {
  return (
    <div>
      {/* HEADER */}
      {children}
      {/* FOOTER */}
    </div>
  );
}

export default Layout;
