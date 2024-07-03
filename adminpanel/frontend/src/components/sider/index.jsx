// components/AdminNav.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const AdminNav = () => {
  const location = useLocation();
  const logout = useLogout(); // Ensure useLogout returns a function

  const handleLogout = () => {
    logout(); // Call the logout function on click
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">
              Job Portal
            </h3>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                to="/adminpanel"
                className={`nav-link ${location.pathname === "/adminpanel" ? "active" : ""}`}
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/register"
                className={'nav-link'}
              >
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/userlist" className="nav-link">
                User List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adminsetting" className="nav-link">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
