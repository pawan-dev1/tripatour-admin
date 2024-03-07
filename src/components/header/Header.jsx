import SearchBar from "../searchBar";
import { Avatar, Drawer } from "antd";

////styles
import "./styles.scss";
import DropDown from "./DropDown";
import AvatarCom from "./Avatar";
import { useState } from "react";
import DrawerComp from "./Drawer";
const HeaderComponent = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <>
      <DrawerComp open={open} setOpen={setOpen} />
      <div className="header-container">
        <div className="header-left-col">
          <div className="logo">G.I</div>
        </div>
        <div className="header-middle-col">
          <SearchBar />
        </div>
        <div className="header-right-col">
          <div className="notification">
            <DropDown />
            <div className="notif-count">24</div>
          </div>
          <div className="profile">
            <AvatarCom showDrawer={showDrawer} open={open} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
