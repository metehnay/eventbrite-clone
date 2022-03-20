import React, { useState, useEffect } from "react";
import "./sass/app.scss";
import { db, auth } from "./configs/firebase-config";
import { MainContext } from "./hooks/Context";
import { eventbriteRoutes } from "./configs/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Routes>
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
