import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddModalProperty from "../AddPropertyModal/AddModalProperty";
import useAuthCheck from "../../hooks/useAuthCheck";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpened) {
        setMenuOpened(false); // Close the menu on scroll
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpened]);

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <NavLink to="/">
          <img src="/logo.png" alt="logo" width={180} />
        </NavLink>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div
            className={`flexCenter h-menu ${menuOpened ? 'open' : 'closed'}`}
          >
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:akashbalaji594@gmail.com">Contact</a>
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddModalProperty
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
            {!isAuthenticated ? (
              <button className="button" onClick={() => loginWithRedirect()}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => setMenuOpened(!menuOpened)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
