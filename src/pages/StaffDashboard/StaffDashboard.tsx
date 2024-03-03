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
          mode: "no-cors", // 'cors' or 'no-cors' or 'same-origin
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
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Delivered",
        data: monthlyData,
        backgroundColor: "#744e78",
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
    <div className="bg-c">
      <div className="flex flex-row s-b">
        <h1>Hello, John Smith</h1>
        <button>Edit inventory</button>
      </div>
      <section className="charts">
        <div className="bar-chart">
          <div className="flex inner-container flex-col">
            <div className="wr-width-2 pure-white m-r p-12">
              <h2 className="center-t">Monthly Deliveries</h2>
              <canvas ref={chartRef2} id="myChart"></canvas>
              {/* {monthlyData != null ? (
                <canvas ref={chartRef2} id="myChart"></canvas>
              ) : (
                <p>Loading...</p>
              )} */}
            </div>
          </div>
        </div>
        <div className="inventory pdd">
          <h2>Inventory by size</h2>
          <div className="bar-chart2">
            <div className="bar-container">
              <span className="bar-label">0</span>
              <div className="bar" style={{ width: "80%" }}></div>
            </div>
            <div className="bar-container">
              <span className="bar-label">1</span>
              <div className="bar" style={{ width: "70%" }}></div>
            </div>
            <div className="bar-container">
              <span className="bar-label">2</span>
              <div className="bar" style={{ width: "60%" }}></div>
            </div>
            <div className="bar-container">
              <span className="bar-label">3</span>
              <div className="bar" style={{ width: "40%" }}></div>
            </div>
            <div className="bar-container">
              <span className="bar-label">4</span>
              <div className="bar" style={{ width: "30%" }}></div>
            </div>
            <div className="bar-container">
              <span className="bar-label">5</span>
              <div className="bar" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>
      </section>
      <section className="orders">
        <div className="flex flex-row">
          <div className="donut-chart mt-2">
            <h2>Orders</h2>
            <canvas
              className="m-w"
              ref={chartRef}
              id="myChart"
              width="400"
              height="400"
            ></canvas>
          </div>
          <div className="ml-2 mt-2 mb-2 flex flex-col s-b center">
            <div className="pure-white style-sst">
              <h3>Open</h3>
              <h2>100</h2>
            </div>
            <div className="pure-white style-sst">
              <h3>In Progress</h3>
              <h2>50</h2>
            </div>
            <div className="pure-white style-sst">
              <h3>Fulfilled</h3>
              <h2>25</h2>
            </div>
          </div>
        </div>

        <div className="order-requests p-or">
          <h2>Order Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>23923023821</td>
                <td>01/01/24</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div className="pure-white"></div>
    </div>
  );
};

export default StaffDashboard;
