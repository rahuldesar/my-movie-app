import React from "react";

import Header from "containers/Layout/Header";
import Footer from "containers/Layout/Footer";

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
