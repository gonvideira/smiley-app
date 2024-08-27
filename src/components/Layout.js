import React from 'react';
import Navbar from './Navbar';  // Adjust the path as needed
import Footer from './Footer';  // Adjust the path as needed

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
