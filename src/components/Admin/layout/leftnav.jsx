import React from 'react';
import { Link } from 'react-router-dom';

const Leftnav = ({ menu, history }) => {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            <div className="sidenav-menu-heading">Menu</div>
            {menu.map(({ path, name }, index) => (
              <Link
                className={`nav-link${path === history.location.pathname ? ' active' : ''}`}
                to={path}
                key={index}
              >
                <div className="nav-link-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bar-chart"
                  >
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                  </svg>
                </div>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="sidenav-footer">
          <div className="sidenav-footer-content">
            <div className="sidenav-footer-subtitle">Logged in as:</div>
            <div className="sidenav-footer-title">Valerie Luna</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Leftnav;
