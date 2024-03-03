import React, { useState, useEffect, useRef } from "react";
import "./StaffDashboard.css";
import UserThumb from "../../assets/Images/StaffImages/UserThumb.png";
import AdminBook from "../../assets/Images/StaffImages/AdminBook.png";
import StaffOrderPad from "./StaffOrderPad";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { useAuth } from "../../AuthContext";

const StaffDashboard: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartRef2 = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState<number[] | null>(null);

  const { mongoId, currentUser } = useAuth();

  const fetchStaffData = async () => {
    try {
      const token = await currentUser?.getIdToken();

      // Use "45591986a6c384137500f75d" to replace mongoId for testing.
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}order?partnerId=${mongoId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Data not fetched. Not ok.");
      }
      const data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const processDataByMonth = (data2: any[]) => {
    const monthlyData = new Array(12).fill(0);

    // For each element,
    data2.forEach((item) => {
      // Parse the date...
      const date = new Date(item.datePlaced);
      // ...and get the month.
      const month = date.getMonth();
      monthlyData[month]++;
    });

    return monthlyData;
  };

  useEffect(() => {
    if (data != null) {
      const monthlyData = processDataByMonth(data);
      setMonthlyData(monthlyData);
    }
  }, [data != null]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const Wrappeddata = {
    labels: ["Wrapped", "Unwrapped"],
    datasets: [
      {
        label: "My First Dataset",
        // to be replaced by actual data
        data: [300, 50],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const diapperWrappingChart = async () => {
    if (chartRef.current != null) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "pie",
          data: Wrappeddata,
        });
        return () => chart.destroy();
      }
    }
  };

  const deliveredData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Delivered",
        data: monthlyData,
        backgroundColor: "grey",
        hoverOffset: 4,
      },
    ],
  };

  const diapperDeliveredChart = async () => {
    if (chartRef2.current != null) {
      const ctx = chartRef2.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: deliveredData,
        });

        return () => chart.destroy();
      }
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  useEffect(() => {
    diapperWrappingChart();
  }, [Wrappeddata]);

  useEffect(() => {
    diapperDeliveredChart();
  }, [deliveredData]);

  return (
    <div>
      <div className="body-m gray-1">
        <h1>Hello, Staff Name</h1>
        <div className="flex inner-container flex-row">
          <div className="flex flex-col m bt">
            <Link
              to="../profile"
              style={{ textDecoration: "none" }}
              className="white flex flex-col"
            >
              <img src={UserThumb} alt="User pic" className="pic-size" />
              <h2>My Account</h2>
            </Link>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              className="white flex flex-col"
            >
              <img src={AdminBook} alt="Admin pic" className="pic-size" />
              <h2>Admin Page</h2>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col pure-white">
              <h2 className="grey-text margin-order">ORDERS</h2>
              <div className="flex flex-row">
                <StaffOrderPad text="Approved" />
                <StaffOrderPad text="In Progress" />
                <StaffOrderPad text="Opened" />
              </div>
            </div>
            <div className="flex flex-row">
              {/* <div className="wr-width pure-white m-r">
              <h2 className="grey-text center-t">DIAPER WRAPPING</h2>
              <canvas
                  ref={chartRef}
                  id="myChart"
                  width="400"
                  height="400"
                ></canvas>
              </div> */}
              <div className="wr-width-2 pure-white m-r">
                <h2 className="grey-text center-t">DIAPERS DELIVERED</h2>
                {monthlyData != null ? (
                  <canvas ref={chartRef2} id="myChart"></canvas>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
