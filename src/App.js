import React, { useState } from "react";
import "./sass/app.scss";
import { MainContext } from "./hooks/Context";
import { eventbriteRoutes } from "./configs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import MainContainer from "./pages/auth/Authentication/MainContainer";
import Header from "./pages/auth/common/Header";

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
  const [inputLabel, setInputLabel] = useState(false);
  const [inputLabel2, setInputLabel2] = useState(false);
  const data = {
    isAuth,
    setIsAuth,
    inputLabel,
    inputLabel2,
    setInputLabel,
    setInputLabel2,
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
