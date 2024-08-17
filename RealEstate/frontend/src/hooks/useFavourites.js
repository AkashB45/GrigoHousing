import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailsContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(user?.email),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user !== undefined,
    staleTime: 30000,

  });


  

  return { data, isError, isLoading, refetch };
};

export default useFavourites;