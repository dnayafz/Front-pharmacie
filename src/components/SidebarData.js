import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "../App.css";


export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Pharmacie",
    path: "/pharmacie",
    icon: <IoIcons.IoMdMedical />,
    cName: "nav-text",
  },
  {
    title: "Pharmacie de garde",
    path: "/pharmaciedegarde",
    icon: <IoIcons.IoIosEye />,
    cName: "nav-text",
  },
  {
    title: "Ville",
    path: "/villes",
    icon: <FaIcons.FaCity />,
    cName: "nav-text",
  },
  {
    title: "Zone",
    path: "/zones",
    icon: <FaIcons.FaMapPin />,
    cName: "nav-text",
  },
  

  {
    title: "About US",
    path: "/footer",
    icon: <FaIcons.FaQuestionCircle />,
    cName: "nav-text",
  },
  
];
