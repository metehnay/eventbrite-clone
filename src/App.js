import React, { useState, useEffect } from "react";
import "./sass/app.scss";
import { db, auth } from "./configs/firebase-config";
import { MainContext } from "./hooks/Context";
import { eventbriteRoutes } from "./configs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Home/Header";
import MainContainer from "./components/Authentication/MainContainer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = ({ hideHeaderPaths = [] }) => {
  const { pathname } = useLocation();

  return (
    <>
      {!hideHeaderPaths.includes(pathname) && <Header />}
      <Outlet />
    </>
  );
};

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const data = {
    isAuth,
    setIsAuth,
  };

  return (
    <>
      <MainContext.Provider value={data}>
        <Router>
          <Layout hideHeaderPaths={["/login"]} />

          <Routes>
            <Route path="/login" element={<MainContainer />} />

            {eventbriteRoutes.map((RouteItem, index) => (
              <Route
                exact
                key={index}
                path={RouteItem.path}
                element={RouteItem.element}
              />
            ))}
          </Routes>
        </Router>
      </MainContext.Provider>
    </>
  );
}

export default App;
