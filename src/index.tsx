import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App hideHeaderPaths={[]} loginPage={false} setLoginPage={function (value: React.SetStateAction<boolean>): void {
      throw new Error("Function not implemented.");
    } } isAuth={""} SetIsAuth={function (value: React.SetStateAction<string | boolean>): void {
      throw new Error("Function not implemented.");
    } } />
  </React.StrictMode>,
  document.getElementById("root")
);
