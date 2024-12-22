import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
// import Grocery from "./components/Grocery";

const Grocery =lazy(()=>import('./components/Grocery'))

const AppLayout = () => {

  // authentication

  const [userName, setUserName] = useState()

  useEffect(() => {
    // make an API call and send username and password
    const data = {
      name:"Akriti Singh"
    }
    setUserName((data.name))
  },[])

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
        {/* <UserContext.Provider value={{ loggedInUser: "Elon Musk" }}> */}
            <Header />
        {/* </UserContext.Provider> */}
          {/* <Body /> */}
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>  
  )
}



const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppLayout />);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<AppLayout />}
        children={
          [
            <Route
              path='/'
              element={<Body />}></Route>,
            <Route
              path='/about'
              element={<About />}></Route>,
            <Route
              path='/contact'
              element={<Contact />}></Route>,
              <Route
              path='/grocery'
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Grocery />
                </Suspense>
              }></Route>,
            <Route
              path="*"
              element={<Error />}></Route>,
            <Route
              path="/restaurants/:resId"
              element={<RestaurantMenu />}></Route>,
            <Route
              path="/cart"
              element={<Cart />}></Route>
          ]          
        }
      ></Route>      
    </Routes>
  </BrowserRouter>
);
