import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { useMutation } from "react-query";
import userDetailsContext from "../../context/UserDetailsContext";
import { checkFavourites, updateFavourites } from "../../utils/Common";
import { toFav } from "../../utils/api";
import useAuthCheck from "../../hooks/useAuthCheck";
const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { user } = useAuth0();
  const { validateLogin } = useAuthCheck();
  
  const {
    userDetails: { favourites },
    setUserDetails,
  } = useContext(userDetailsContext);
  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });
  useEffect(() => {
    setHeartColor(()=>checkFavourites(id,favourites))
  }, [favourites]);
  const handleHeartClick = () => {
    mutate();
    setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
  };
  return (
    <>
      <AiFillHeart
        size={25}
        color={heartColor}
        onClick={(e) => {
          e.stopPropagation();
          validateLogin() &&  handleHeartClick();
        }}
      />
    </>
  );
};

export default Heart;
