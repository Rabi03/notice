import {
  CloudIcon, DocumentIcon, FolderIcon,VideoCameraIcon
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";


const Nav = ({ sidebarOutsideClick }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => {
    setSidebarStatus(false);
  };

  const sidebarOpen = () => {
    setSidebarStatus(true);
  };

  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

   //if menu has chile menu then  use seperate array
   const childMenu = [
    {
      subMenuTitle: "child One",
      linkHref: "/"
    },
    {
      subMenuTitle: "child Two",
      linkHref: "/"
    },
    {
      subMenuTitle: "child Three",
      linkHref: "/"
    }
  ];

  useEffect(() => {
    if (sidebarOutsideClick) {
      setSidebarStatus(false);
    }
  }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
       

        <NavItem
          hrefLink='/video'
          sidebarStatus={sidebarStatus}
          menuTitle="Video"
          subMenu={false}
          subMenuArray={null}
        >
          <VideoCameraIcon className="h-10" />
        </NavItem> 

        <NavItem
          hrefLink='/notice'
          sidebarStatus={sidebarStatus}
          menuTitle="notice"
          subMenu={false}
          subMenuArray={null}
        >
          <DocumentIcon className="h-10" />
        </NavItem> 
       
      </nav>
    </>
  );
};

export default Nav;
