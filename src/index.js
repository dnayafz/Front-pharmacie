import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Zone from "./routes/Zone";
import Pharmacie from "./routes/Pharmacie";
import Ville from "./routes/Ville";
import Navbar from "./components/Navbar";
import Map from "./routes/Map";
import Register from "./routes/register";
import PharmaDetails from "./routes/PharmaDetails";
import Pharmaciedegarde from "./routes/Pharmaciedegarde";
import Login from "./routes/login";

import "./App.css";


const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
  
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Pharmacie />} />
//       <Route path="/products" element={<Zone />} />
//       <Route path="/reports" element={<Ville />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Map />,
      },
      
      {
        path: "/",
        element: <Login />,
      },

      
      {
        path: "zones",
        element: <Zone />,
      },
      {
        path: "villes",
        element: <Ville />,
      },
      {
        path: "pharmacie",
        element: <Pharmacie />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "pharmadetails/:id",
        element: < PharmaDetails />,
      },
      {
        path: "Pharmaciedegarde",
        element: < Pharmaciedegarde />,
      },

      {
        path: "footer",
        element: < footer />,
      },
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
