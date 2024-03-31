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

  // Define the type for each object in the array
  type MonthlyDataItem = {
    Month: string;
    Data: number;
  };

  type OrderItem = {
    OrderId: string;
    datePlaced: string;
  };

  type CategorizedOrders = {
    unreviewed: 0;
    inProgress: 0;
    filled: 0;
  };

  type SizeItem = {
    month: string;
    Reserved: any;
    Available: number;
  };

  // Use this type in the useState hook
  const [monthlyData, setMonthlyData] = useState<MonthlyDataItem[] | null>(
    null
  );
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderItem[] | null>(null);
  const [categorizedOrders, setCategorizeOrders] = useState<CategorizedOrders>({
    unreviewed: 0,
    inProgress: 0,
    filled: 0,
  });
  const [sizeItem, setSizes] = useState<SizeItem | null>({
    month: "size 0",
    Reserved: 0,
    Available: 0,
  });

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
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const processDataByMonth = (data2: any[]) => {
    const monthlyData = new Array(12).fill(0);
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];

    // For each element,
    data2.forEach((item) => {
      // Parse the date...
      const date = new Date(item.datePlaced);
      // ...and get the month.
      const month = date.getMonth();
      monthlyData[month]++;
    });

    // Convert monthlyData into [{ Month: months[i], Maybe: monthlyData[i] }]
    const formattedMonthlyData = months.map((month, index) => {
      return { Month: month, Data: monthlyData[index] };
    });

    // If you need to return or work with formattedMonthlyData, you can do so here.
    return formattedMonthlyData;
  };

  const processOrders = (data2: any[]) => {
    const orders = data2.map((item) => {
      return { OrderId: item._id, datePlaced: item.datePlaced };
    });

    return orders;
  };

  const processCategorizeOrders = (data2: any[]) => {
    const newCounts: CategorizedOrders = {
      unreviewed: 0,
      inProgress: 0,
      filled: 0,
    };

    data2.forEach((item) => {
      if (item.status === "CANCELLED") {
        // do nothing
      } else if (item.status === "OPEN" || item.status === "PLACED") {
        newCounts.unreviewed++;
      } else if (item.status === "APPROVED") {
        newCounts.inProgress++;
      } else if (item.status === "FILLED") {
        newCounts.filled++;
      }
    });

    return newCounts;
  };

  const processSizes = (data2: any[]) => {
    const sizes = data2.reduce(
      (acc, item) => {
        acc.size0 += item.newborn;
        acc.size1 += item.size1;
        acc.size2 += item.size2;
        acc.size3 += item.size3;
        acc.size4 += item.size4;
        acc.size5 += item.size5;
        acc.size6 += item.size6;
        return acc;
      },
      { size0: 0, size1: 0, size2: 0, size3: 0, size4: 0, size5: 0, size6: 0 }
    );

    const barChartData = [
      { month: "size 0", Reserved: sizes.size0, Available: sizes.size0 - 200 },
      { month: "size 1", Reserved: sizes.size1, Available: sizes.size1 - 200 },
      { month: "size 2", Reserved: sizes.size2, Available: sizes.size2 - 500 },
      { month: "size 3", Reserved: sizes.size3, Available: sizes.size3 - 1000 },
      { month: "size 4", Reserved: sizes.size4, Available: sizes.size4 - 200 },
      { month: "size 5", Reserved: sizes.size5, Available: sizes.size5 - 1400 },
      { month: "size 6", Reserved: sizes.size6, Available: sizes.size6 - 600 },
    ];

    return barChartData;
  };

  useEffect(() => {
    if (data) {
      setMonthlyData(processDataByMonth(data));
      setOrders(processOrders(data));
      setCategorizeOrders(processCategorizeOrders(data));
      setSizes(processSizes(data));
    }
  }, [data]); // Just use data here

  useEffect(() => {
    fetchStaffData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Assuming `categorizedOrders` is your state containing the real counts
  const categorizedOrdersChartData = [
    {
      name: "Unreviewed",
      value: categorizedOrders?.unreviewed ?? 0, // Use real data or fallback to 0
      color: "var(--chart-light-color)",
    },
    {
      name: "In Progress",
      value: categorizedOrders?.inProgress ?? 0, // Use real data or fallback to 0
      color: "var(--chart-dark-color)",
    },
    {
      name: "Filled",
      value: categorizedOrders?.filled ?? 0, // Use real data or fallback to 0
      color: "var(--chart-primary-color)",
    },
  ];

  // const fakeTable = [
  //   { orderNumber: 2309840293840, date: "01/01/24" },
  //   { orderNumber: 2309840293841, date: "01/02/24" },
  //   { orderNumber: 2309840293842, date: "01/03/24" },
  //   { orderNumber: 2309840293843, date: "01/04/24" },
  //   { orderNumber: 2309840293844, date: "01/05/24" },
  // ];

  const rows = orders?.map((element) => (
    <Table.Tr key={element.OrderId}>
      <Table.Td>{element.OrderId}</Table.Td>
      <Table.Td ta="right">{element.datePlaced}</Table.Td>
    </Table.Tr>
  ));

  const fakeBarChartVertical = [
    { month: "size 0", Reserved: 700, Avaliable: 200 },
    { month: "size 1", Reserved: 1200, Avaliable: 200 },
    { month: "size 2", Reserved: 700, Avaliable: 500 },
    { month: "size 3", Reserved: 400, Avaliable: 1000 },
    { month: "size 4", Reserved: 1000, Avaliable: 200 },
    { month: "size 5", Reserved: 800, Avaliable: 1400 },
    { month: "size 6", Reserved: 750, Avaliable: 600 },
  ];

  // const fakeBarChartHorizontal = [
  //   { month: "Jan.", Data: 1200 },
  //   { month: "Feb.", Data: 1900 },
  //   { month: "Mar.", Data: 400 },
  //   { month: "Apr.", Data: 1000 },
  //   { month: "May", Data: 800 },
  //   { month: "Jun.", Data: 750 },
  //   { month: "Jul.", Data: 500 },
  //   { month: "Aug.", Data: 300 },
  //   { month: "Sep.", Data: 750 },
  //   { month: "Oct.", Data: 400 },
  //   { month: "Nov.", Data: 750 },
  //   { month: "Dec.", Data: 750 },
  // ];

  return (
    <>
      {console.log(data)}
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
                data={categorizedOrdersChartData}
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
                <Text>In Progress</Text>
              </Flex>
              <Flex justify="center" gap="md" align={"center"}>
                <IconCircle className="approved-icon" size=".75rem" />
                <Text>Filled</Text>
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
              <Text>Unreviewed</Text>
              <Title>{categorizedOrders?.unreviewed}</Title>
            </Flex>
            <Flex
              flex="1"
              justify="center"
              ta="center"
              p="md"
              direction="column"
              className="dashboard-box"
            >
              <Text>In Progress</Text>
              <Title>{categorizedOrders?.inProgress}</Title>
            </Flex>
            <Flex
              flex="1"
              justify="center"
              ta="center"
              p="md"
              direction="column"
              className="dashboard-box"
            >
              <Text>Filled</Text>
              <Title>{categorizedOrders?.filled}</Title>
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
            <Table.ScrollContainer minWidth={100} style={{ maxHeight: "40vh" }}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Order #</Table.Th>
                    <Table.Th ta={"right"}>Date</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
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
                { name: "Reserved", color: "var(--chart-dark-color)" },
                { name: "Avaliable", color: "var(--chart-light-color)" },
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
              data={monthlyData ?? []}
              dataKey="Month"
              series={[{ name: "Data", color: "var(--chart-dark-color)" }]}
              tickLine="y"
            />
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default StaffDashboard;
