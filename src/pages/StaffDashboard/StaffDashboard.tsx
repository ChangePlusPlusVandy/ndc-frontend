import React, { useState, useEffect } from "react";
import "./StaffDashboard.css";

const StaffDashboard: React.FC = () => {

  useEffect(() => {

  }, []);

  return (
    <div >
        <header>header</header>
        <h1>Hello,<br/> Staff Name</h1>
        <div className="flex flex-row">
            <div className="flex flex-col m">
                <div>
                    component1
                </div>
                <div>
                    component1
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <div>
                        order1
                    </div>
                    <div>
                        order2
                    </div>
                    <div>
                        order3
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        component2a
                    </div>
                    <div>
                        component2b
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StaffDashboard;
