import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

import App from "./App";
import Home from "./views/Home";
import Profile from "./views/Profile";
import RequireAuth from "./components/RequireAuth";
import { store, persistor } from "./redux/store";
import { theme } from "./styles/Theme";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);

root.render(
  <ThemeProvider theme={theme}>
    <ToastContainer
      position="top-center"
      theme="dark"
      autoClose={2000}
    />
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<App />}
            />
            <Route element={<RequireAuth />}>
              <Route
                path="/home"
                element={<Home />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
