import React from "react";
import Navbar from "../../components/Navbar";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheatersList from "./TheatersList";

function Admin() {


    const items = [
        { 
            key: 1,
            label: "Movies",
            children: <MoviesList />
        },
        { 
            key: 2,
            label: "Theaters",
            children: <TheatersList />
        }

    ]

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h4 className="text-center mt-2"> ADMIN PANEL</h4>
      <Tabs defaultActiveKey="1" items={items} tabPosition="left"></Tabs>
    </div>
  );
}

export default Admin;
