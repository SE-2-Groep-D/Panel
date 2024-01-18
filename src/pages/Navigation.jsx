import { Link, useLocation } from "react-router-dom";
import { Logo, Button } from "@components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCross,
  faHome,
  faMagnifyingGlass,
  faNewspaper,
  faRightFromBracket,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@hooks";
import { useState } from "react";

const hideNavigationRoutes = [
  "/setup",
  "/login",
  "/register",
  "/privacy",
  "/onderzoek/aanmaken",
  "/onderzoek/:onderzoekId",
];

const NavigationItem = ({ to, icon, label, isActive, onClick }) => (
  <li
    className={`navigation-item ${isActive(to)}`}
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    <Link to={to}>
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
      {label}
    </Link>
  </li>
);

function Navigation() {
  const { authenticated, logoutUser, userInfo } = useAuth();
  const [open, setOpen] = useState(false);
  const route = useLocation();

  if (hideNavigationRoutes.includes(route.pathname) || !authenticated) {
    return null;
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  function onClick() {
    setOpen(!open);
  }

  return (
    <nav className="navigation" role="navigation">
      <Link className="home" to="/">
        <Logo small />
      </Link>

      <ul className={open ? "navigation-items open" : "navigation-items"}>
        <div className="links">
          <NavigationItem
            to="/"
            icon={faHome}
            label="Dashboard"
            isActive={isActive}
            onClick={onClick}
          />
          <NavigationItem
            to="/onderzoek"
            icon={faMagnifyingGlass}
            isActive={isActive}
            onClick={onClick}
            label="Onderzoeken"
          />

          {userInfo.userType !== "Bedrijf" && (
            <NavigationItem
              to="/nieuwsbrief"
              icon={faNewspaper}
              isActive={isActive}
              onClick={onClick}
              label="Nieuws"
            />
          )}
        </div>

        <NavigationItem
          to="/profiel"
          icon={faUser}
          isActive={isActive}
          onClick={onClick}
          label="Profiel"
        />

        <Button
          aria-label="Log uit"
          className="logout"
          onClick={() => logoutUser()}
        >
          <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
          Uitloggen
        </Button>
      </ul>

      <button className="navigation-button" onClick={onClick}>
        <FontAwesomeIcon icon={!open ? faBars : faXmark} />
      </button>
    </nav>
  );
}

export default Navigation;
