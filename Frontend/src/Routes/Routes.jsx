import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Screens/Home.jsx";
import Register from "../Screens/Register.jsx";
import Login from "../Screens/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Project from "../Screens/Project.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/project",
    element:<Project/>
  }
]);

const APPRoutes = () => {
  return (

    //we  can create this way also
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/register" element={<Register />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //   </Routes>
    // </BrowserRouter>
    <>
    <RouterProvider router={route}/>
    
    </>
  );
};

export default APPRoutes;
