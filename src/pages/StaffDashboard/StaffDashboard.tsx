import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//import Chart from 'chart.js/auto';

import { rem, Container, Text, Title, Flex, Grid, Table } from "@mantine/core";
import { DonutChart, BarChart } from "@mantine/charts";
import { useAuth } from "../../AuthContext";

import "../../styles/StaffDashboard.css";
import { IconCircleFilled, IconCircle } from "@tabler/icons-react";

export interface InventoryResponse {
  id: number;
  wrapped: {
    newborn: number;
    size1: number;
    size2: number;
    size3: number;
    size4: number;
    size5: number;
    size6: number;
  };
  unwrapped: {
    newborn: number;
    size1: number;
    size2: number;
    size3: number;
    size4: number;
    size5: number;
    size6: number;
  };
}

const StaffDashboard: React.FC = () => {
  // const chartRef = useRef<HTMLCanvasElement>(null);
  // const chartRef2 = useRef<HTMLCanvasElement>(null);

  /*const diapperWrappingChart = async () => {
      if(chartRef.current != null){
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
              const chart = new Chart(ctx, {
                  type: 'pie',
                  data: Wrappeddata,
              });
              return () => chart.destroy();
          }
      }
  }*/

  // const deliveredData = {
  //   labels: [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ],
  //   datasets: [
  //     {
  //       label: "Delivered",
  //       data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 70, 80, 90],
  //       backgroundColor: "grey",
  //       hoverOffset: 4,
  //     },
  //   ],
  // };

  // const getInventory = async () => {
  //   const token = await currentUser?.getIdToken();

  //   let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/inventory`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const data: InventoryResponse = await res.json();
  //   setInventory(data);
  //   console.log(inventory);
  // };

  /*const diapperDeliveredChart = async () => {
      if(chartRef2.current != null){
          const ctx = chartRef2.current.getContext('2d');
          if (ctx) {
              const chart = new Chart(ctx, {
                  type: 'bar',
                  data: deliveredData,
              });

      return () => chart.destroy();
    }
  }
};

useEffect(() => {
  diapperWrappingChart();
}, [Wrappeddata]);

  useEffect(() => {
      diapperDeliveredChart();
  },[deliveredData]);*/

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState<number[] | null>(null);

  const { mongoId, currentUser } = useAuth();

  const fetchStaffData = async () => {
    try {
      const token = await currentUser?.getIdToken();

      // Use "45591986a6c384137500f75d" to replace mongoId for testing.
      // "71481986a6c384137500f75e" for smaller data set.
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }order?partnerId=45591986a6c384137500f75d`,
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
      console.log(data);
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

  useEffect(() => {
    fetchStaffData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const fakeDonutChart = [
    { name: "Unreviewed", value: 400, color: "var(--chart-light-color)" },
    { name: "Open", value: 300, color: "var(--chart-dark-color)" },
    { name: "Approved", value: 300, color: "var(--chart-primary-color)" },
  ];

  const fakeTable = [
    { orderNumber: 2309840293840, date: "01/01/24" },
    { orderNumber: 2309840293841, date: "01/02/24" },
    { orderNumber: 2309840293842, date: "01/03/24" },
    { orderNumber: 2309840293843, date: "01/04/24" },
    { orderNumber: 2309840293844, date: "01/05/24" },
  ];

  const rows = fakeTable.map((element) => (
    <Table.Tr key={element.orderNumber}>
      <Table.Td>{element.orderNumber}</Table.Td>
      <Table.Td ta="right">{element.date}</Table.Td>
    </Table.Tr>
  ));

  const fakeBarChartVertical = [
    { month: "0", Yes: 1200, No: 200 },
    { month: "1", Yes: 700, No: 500 },
    { month: "2", Yes: 400, No: 1000 },
    { month: "3", Yes: 1000, No: 200 },
    { month: "4", Yes: 800, No: 1400 },
    { month: "5", Yes: 750, No: 600 },
  ];

  const fakeBarChartHorizontal = [
    { month: "Jan.", Maybe: 1200 },
    { month: "Feb.", Maybe: 1900 },
    { month: "Mar.", Maybe: 400 },
    { month: "Apr.", Maybe: 1000 },
    { month: "May", Maybe: 800 },
    { month: "Jun.", Maybe: 750 },
    { month: "Jul.", Maybe: 500 },
    { month: "Aug.", Maybe: 300 },
    { month: "Sep.", Maybe: 750 },
    { month: "Oct.", Maybe: 400 },
    { month: "Nov.", Maybe: 750 },
    { month: "Dec.", Maybe: 750 },
  ];

  return (
    <>
      <Title ta={{ base: "center", sm: "left" }} p="md">
        Hello, Staff Name
      </Title>
      <Grid grow gutter="md" justify="center" align="stretch">
        <Grid.Col className="grid-col" span={{ base: 12, sm: 6, md: 5 }}>
          <Flex
            justify="space-between"
            flex="1"
            className="dashboard-box"
            p="md"
            direction="column"
          >
            <Text>Orders</Text>
            <Flex p="lg" justify="center">
              <DonutChart
                data={fakeDonutChart}
                withLabelsLine={false}
                withLabels
                tooltipDataSource="segment"
              />
            </Flex>
            <Flex
              direction={{ base: "column", xs: "row" }}
              justify={{ base: "center", xs: "space-evenly" }}
            >
              <Flex justify="center" gap="md" align={"center"}>
                <IconCircle className="unreviewed-icon" size=".75rem" />
                <Text>Unreviewed</Text>
              </Flex>
              <Flex justify="center" gap="md" align={"center"}>
                <IconCircle className="open-icon" size=".75rem" />
                <Text>Open</Text>
              </Flex>
              <Flex justify="center" gap="md" align={"center"}>
                <IconCircle className="approved-icon" size=".75rem" />
                <Text>Approved</Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col className="grid-col" span={{ base: 12, sm: 2 }}>
          <Flex
            justify="stretch"
            gap="md"
            p="0"
            flex="1"
            direction={{ base: "column", xs: "row", sm: "column" }}
            align="stretch"
          >
            <Flex
              flex="1"
              justify="center"
              ta="center"
              p="md"
              direction="column"
              className="dashboard-box"
            >
              <Text>Open</Text>
              <Title>100</Title>
            </Flex>
            <Flex
              flex="1"
              justify="center"
              ta="center"
              p="md"
              direction="column"
              className="dashboard-box"
            >
              <Text>Unreviewed</Text>
              <Title>50</Title>
            </Flex>
            <Flex
              flex="1"
              justify="center"
              ta="center"
              p="md"
              direction="column"
              className="dashboard-box"
            >
              <Text>Approved</Text>
              <Title>25</Title>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col className="grid-col" span={{ base: 12, sm: 4, md: 5 }}>
          <Flex
            justify="flex-start"
            gap="md"
            flex="1"
            className="dashboard-box"
            p="md"
            direction="column"
          >
            <Text>Order Requests</Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Order #</Table.Th>
                  <Table.Th ta={"right"}>Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Flex>
        </Grid.Col>
        <Grid.Col className="grid-col" span={{ base: 12, sm: 6 }}>
          <Flex
            className="dashboard-box"
            gap="md"
            flex="1"
            p="md"
            direction="column"
          >
            <Text>Inventory by Size</Text>
            <BarChart
              h={250}
              data={fakeBarChartVertical}
              dataKey="month"
              type="stacked"
              orientation="vertical"
              series={[
                { name: "Yes", color: "var(--chart-dark-color)" },
                { name: "No", color: "var(--chart-light-color)" },
              ]}
            />
          </Flex>
        </Grid.Col>
        <Grid.Col className="grid-col" span={{ base: 12, sm: 6 }}>
          <Flex
            p="md"
            gap="md"
            className="dashboard-box"
            flex="1"
            direction="column"
          >
            <Text>Monthly Deliveries</Text>
            <BarChart
              h={250}
              data={fakeBarChartHorizontal}
              dataKey="month"
              series={[{ name: "Maybe", color: "var(--chart-dark-color)" }]}
              tickLine="y"
            />
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default StaffDashboard;
