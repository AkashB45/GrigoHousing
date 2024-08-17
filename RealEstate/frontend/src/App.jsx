import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Website from "./pages/Website";
import Layout from "./components/Layout/Layout";
import { Suspense, useState } from "react";
import Properties from "./pages/Properties/Properties";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailsContext from "./context/UserDetailsContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import NotFound from "./components/NotFound/NotFound";
import { SearchProvider } from "./context/searchContext";
import MyProperties from "./pages/MyProperties/MyProperties";
function App() {
  const queryClient = new QueryClient(); 
  const[userDetails,setUserDetails] = useState({
    favourites:[],
    bookings: [],
    token:null
  })
  return (
    <UserDetailsContext.Provider value={{userDetails,setUserDetails}}>
        <SearchProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route element={<Layout />}>
            
              <Route path="/" element={<Website />} />
              <Route path="/properties">
                <Route index element={<Properties />} />
                <Route path=":id" element={<Property />} />
              </Route>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="myProperties" element={<MyProperties/>}/>
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    </SearchProvider>
    </UserDetailsContext.Provider>
  );
}

export default App;
