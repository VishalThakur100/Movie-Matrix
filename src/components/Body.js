import React from "react";
import Login from "./Login";
import Browse from "./Browse";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./Error";
// import Login from './components/Login';
// import Browse from './components/Browse';

const Body = () => {
  

  // const appRouter = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/browse ",
  //     element: <Browse />,
  //   },
  // ]);

 

  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} /> {/* Add this line */}
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
      {/* <RouterProvider router={appRouter} /> */}
    </div>
  );
};

export default Body;
