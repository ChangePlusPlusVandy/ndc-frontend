import React, { useState, useEffect } from "react";
import "./StaffDashboard.css";
import UserThumb from "../../assets/Images/StaffImages/UserThumb.png";
import AdminBook from "../../assets/Images/StaffImages/AdminBook.png";
import BarChart from "../../assets/Images/StaffImages/BarChart.png";
import PieChart from "../../assets/Images/StaffImages/PieChart.png";
import StaffOrderPad from "./StaffOrderPad";

const StaffDashboard: React.FC = () => {

  useEffect(() => {

  }, []);

  return (
    <div>
        <header className="header">Nash D.C.</header>
        <div className="body-m gray-1">
        <h1>Hello,<br/> Staff Name</h1>
        <div className="flex flex-row">
            <div className="flex flex-col m bt">
                <div className="white flex flex-col">
                    <img src={UserThumb} alt="User pic" className="pic-size"/>
                    <h2>My Account</h2>
                </div>
                <div className="white flex flex-col" >
                <img src={AdminBook} alt="Admin pic" className="pic-size"/>
                <h2>Admin Page</h2>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col pure-white">
                    <h2 className="grey-text margin-order">ORDERS</h2>
                    <div className="flex flex-row">
                        <StaffOrderPad text="Open"/>
                        <StaffOrderPad text="Unreviewed"/>
                        <StaffOrderPad text="Approved"/>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="wr-width pure-white m-r">
                        <h2 className="grey-text center-t">
                            DIAPER WRAPPING
                        </h2>
                        <img src={PieChart} alt="pie chart" className="wr-width"/>
                    </div>
                    <div className="wr-width-2 pure-white m-r">
                        <h2 className="grey-text center-t">
                            DIAPERS DELIVERED
                        </h2>
                        <img src={BarChart} alt="bar chart" className="wr-width-2" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default StaffDashboard;
