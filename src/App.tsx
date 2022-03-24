import React, { useState, ReactNode } from "react";
import "./sass/app.scss";
import { MainContext } from "./hooks/Context";
import { eventbriteRoutes } from "./configs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import MainContainer from "./pages/auth/Authentication/MainContainer";
import Header from "./pages/auth/common/Header";

type Props = {
  hideHeaderPaths: Array<string>,
  loginPage: boolean;
  isAuth: string | boolean;
  SetIsAuth: React.Dispatch<React.SetStateAction<string | boolean>>
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout: React.FC<Props> = ({ hideHeaderPaths}) => {
  const { pathname } = useLocation();

  return (
    <>
      {!hideHeaderPaths.includes(pathname)&& <Header />}
      <Outlet />
    </>
  );
};

const App: React.FC<Props>= ({loginPage, setLoginPage}) => {
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
          <Layout hideHeaderPaths={["/login"]} loginPage={false} setLoginPage={function (value: React.SetStateAction<boolean>): void {
            throw new Error("Function not implemented.");
          } } isAuth={""} SetIsAuth={function (value: React.SetStateAction<string | boolean>): void {
            throw new Error("Function not implemented.");
          } } />

          <Routes>
            <Route path="/login" element={<MainContainer loginPage={loginPage} setLoginPage={setLoginPage} />} />

            {eventbriteRoutes.map((RouteItem, index) => (
              <Route
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
