import { useNavigate } from "react-router-dom";
import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { replace } from "lodash";
import { Link } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  const { navigate } = useNavigate();

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius="xl" />
      </Menu.Target>
      <Menu.Dropdown>
      <Link to={"/favourites"}><Menu.Item>Favourites</Menu.Item></Link>
      <Link to={"/bookings"}><Menu.Item>Bookings</Menu.Item></Link>
      <Link to={"/myProperties"}><Menu.Item>My Properties</Menu.Item></Link>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
