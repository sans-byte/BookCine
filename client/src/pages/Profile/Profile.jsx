import React from "react";
import Navbar from "../../components/Navbar";
import { Button, Menu } from "antd";
import { useState } from "react";
import {
  GiTicket,
  GiTheaterCurtains,
  GiTakeMyMoney,
  GiChatBubble,
  GiOpenGate,
} from "react-icons/gi";

function getItem(label, key, icon, danger, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Bookings", "1", <GiTicket />),
  getItem("Transactions", "2", <GiTakeMyMoney />),
  getItem("Help and support", "3", <GiChatBubble />),
  getItem("Theater", "4", <GiTheaterCurtains />),
  getItem("Logout", "5", <GiOpenGate />),
];

function Profile() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="" style={{ height: "100vh" }}>
      <div className="d-block h-10">
        <Navbar />
      </div>
      <div className="row w-100">
        <div className="col-3">
          <div className="text-center p-4 bg-dark text-white">
            <h3> Hey there! </h3>
          </div>
          <Menu
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            mode="vertical"
            defaultSelectedKeys={["1"]}
            expandIcon
            items={items}
            theme="light"
          />
        </div>
        <div className="col-9"></div>
      </div>
    </div>
  );
}

export default Profile;
