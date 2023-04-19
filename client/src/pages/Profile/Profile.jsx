import React from "react";
import Navbar from "../../components/Navbar";
import { Button, Menu, Drawer } from "antd";
import { useState } from "react";
import {
  GiTicket,
  GiTheaterCurtains,
  GiTakeMyMoney,
  GiChatBubble,
  GiOpenGate,
  GiHamburgerMenu,
} from "react-icons/gi";
import Bookings from "./Bookings";
import TheaterListUser from "./TheatersListUser";

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
];

function Profile() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [pageItem, setPageItem] = useState("1");

  return (
    <>
      {
        //=====================================================
        // Drawer Container Code
        <Drawer
          title={
            <div className="text-start text-white ">
              <h3 className="fw-bolder">Hey!</h3>
            </div>
          }
          placement="right"
          onClose={onClose}
          open={open}
          className="bg-danger"
          bodyStyle={{ padding: 0, textAlign: "start" }}
          closeIcon={<div className="d-none"></div>}
          footer={
            <div className="">
              <div className="w-100">
                <button
                  className="w-100 btn-sm btn btn-danger"
                  onClick={() => {
                    setPageItem("4");
                    setOpen(false);
                  }}
                >
                  Theater
                </button>
              </div>
            </div>
          }
        >
          <Menu
            style={{
              width: "100%",
              height: "100%",
            }}
            mode="vertical"
            defaultSelectedKeys={["1"]}
            expandIcon
            items={items}
            theme="dark"
            onClick={(item) => {
              setPageItem(item.key);
              setOpen(false);
            }}
          />
        </Drawer>

        //=====================================================
      }
      <div className="" style={{ height: "100vh" }}>
        <div className="d-block h-10">
          <Navbar />
        </div>
        <div className="bg-dark p-2 mb-2">
          <Button
            type="primary"
            className="p-3 d-flex justify-content-center align-items-center "
            onClick={showDrawer}
          >
            <GiHamburgerMenu />
            <span className="ms-2"> Menu </span>
          </Button>
        </div>

        <div className="">
          {pageItem == "1" ? (
            <Bookings />
          ) : pageItem == "4" ? (
            <TheaterListUser />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
