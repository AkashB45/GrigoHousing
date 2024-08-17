import React, { useContext,useEffect } from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import userDetailContext from '../../context/UserDetailsContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import {createUser} from '../../utils/api';
import useFavourites from '../../hooks/useFavourites';
import useBookings from '../../hooks/useBookings';
import Chatbot from "../../pages/ChatBot/Chatbot";


const Layout = () => {
  const {userDetails,setUserDetails} = useContext(userDetailContext)
  const {isAuthenticated,user} = useAuth0();
  useFavourites()
  useBookings()
  const {mutate} = useMutation(
    {
      mutationKey:[user?.email],
      mutationFn:()=>createUser(user?.email)
    }
  );
  useEffect(()=>{
    
    
    isAuthenticated && mutate()
  },[isAuthenticated])
  return (
    <>
    <div style={{background:"var(--black)"}}>
    <Header/>
    {/* <div style={{paddingTop:" 80px"}}></div> */}
    <Chatbot/>
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout