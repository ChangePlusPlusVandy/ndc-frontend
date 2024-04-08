import React, { useState, useEffect, FormEvent } from "react";
import "@mantine/dates/styles.css";
import OrderStatusIndicator from "../components/OrderStatusIndicator";
import "./OrderPopup.css";
import { IconCircleX } from '@tabler/icons-react';
import { randomId, useDisclosure, useListState } from "@mantine/hooks";
import { Modal, Button, Title, Text, NumberInput, Checkbox, Container, Stepper, Stack, Group } from "@mantine/core";
import Order from "./OrderTracking/OrderClass";
import { useAuth } from "../AuthContext";
import "../styles/OrderPopup.css";

const OrderPopup: React.FC<{
  children: React.ReactNode;
  order: Order;
}> = ({ children, order }) => {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    console.log("Order information: ", order);
  }, [])

  function getPrintableStatus() {
    switch (order?.status) {
      case "OPEN":
      case "PLACED":
        return "Placed"
      case "APPROVED":
        return "Approved"
      case "FILLED":
        return "Delivered"
      case "CANCELLED":
        return "Canceled"
      default:
        return "Filled"
    }
  }

  function getStepperIndex() {
    switch (order?.status) {
      case "OPEN":
      case "PLACED":
        return 1
      case "APPROVED":
        return 2
      case "FILLED":
        return 3
      case "CANCELLED":
        return 3
      default:
        return 0
    }
  }



  return (
    <>
      <div onClick={open}>{children}</div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="xl"
        padding="xl"
        radius="15"
      >
        <div className="order-popup-container">
          <Title order={2}>Order Details</Title>
          <div className="single-order-status-container single-order-modal-margin">
            <div className="order-status">
              <OrderStatusIndicator status={order.status} size="lg" />
              <Text size="sm" className="single-order-completed-date">{getPrintableStatus()} on {order?.dateCompleted.toDateString()}</Text>
            </div>
            <div className="order-timeline">
              <Stepper active={getStepperIndex()} contentPadding="sm" size="sm">
                <Stepper.Step completedIcon={order?.status == "CANCELLED" && <IconCircleX />} label="Order Received" color="#804d7a">
                </Stepper.Step>
                <Stepper.Step completedIcon={order?.status == "CANCELLED" && <IconCircleX />} label="Order Approved" color="#804d7a">
                </Stepper.Step>
                <Stepper.Step completedIcon={order?.status == "CANCELLED" && <IconCircleX />} label={order?.status == "CANCELLED" ? "Canceled" : "Delivered"} color="#804d7a">
                </Stepper.Step>
              </Stepper>
            </div>
          </div>
          <div className="single-order-info-container single-order-modal-margin">
            <div className="single-order-info">
              <div className="order-info">
                <Title order={4} className="order-info-title">Order Information</Title>
                <div className="order-info-content">
                  <div className="order-info-content-inner">
                    <Text size="sm">Date</Text>
                    <Text>{order?.datePlaced.toDateString()}</Text>
                  </div>
                  <div className="order-info-content-inner">
                    <Text size="sm">Diaper Quantity (Total)</Text>
                    <Text>{order?.numDiapers}</Text>
                  </div>
                  <div className="order-info-content-inner">
                    <Text size="sm">Distribution Center</Text>
                    {/* TODO: Fix Hardcoded Val */}
                    <Text>Warehouse</Text>
                  </div>
                  <div className="order-info-content-inner">
                    <Text size="sm">Delivery Instructions</Text>
                    {/* TODO: Fix Hardcoded Val */}
                    <Text>Leave at reception</Text>
                  </div>
                </div>
              </div>
              <div className="contact-info single-order-modal-margin">
                <Title order={4} >Contact information</Title>
              </div>
            </div>
            <div className="single-order-quantities">
              <Title order={4} >Diaper Quantities</Title>
            </div>
          </div>
        </div>
      </Modal>
    </>

  )
};

export default OrderPopup;

















// const [opened, { open, close }] = useDisclosure(false);
// const [date, setDate] = useState<Date | null>(null);
// const [value, setValue] = useState<Date | null>(null);
// const [numDiapers, setNumDiapers] = useState<number>(order.numDiapers);
// const [orderStatus, setOrderStatus] = useState<string>(order.status);
// const [sizes, setSizes] = useState<number[]>(order.diaperDist);
// const { getUser, isStaff, currentUser } = useAuth();
// const user = getUser();

// useEffect(() => {
//   console.log("Order information: ", order);
// }, [])

// //Mantine Checkbox use
// const initialValues = [
//   {
//     label: "Unreviewed",
//     checked: order.status === "PLACED",
//     key: randomId(),
//     backendValue: "PLACED",
//   },
//   {
//     label: "Filled",
//     checked: order.status === "FILLED",
//     key: randomId(),
//     backendValue: "FILLED",
//   },
//   {
//     label: "In Progress",
//     checked: order.status === "APPROVED" || order.status === "OPEN",
//     key: randomId(),
//     backendValue: "OPEN",
//   },
// ];

// const [values, handlers] = useListState(initialValues);

// const handleCheckboxChange = (index: any) => {
//   handlers.setState((current) =>
//     current.map((value, i) => ({ ...value, checked: i === index }))
//   );

//   const checkedStatus = values[index]?.backendValue ?? "PLACED";
//   setOrderStatus(checkedStatus);
//   console.log(checkedStatus);
// };

// const handleQuantityChange = (val: number, index: number) => {
//   const newSizes = sizes.map((num, i) => {
//     if (index === i) {
//       return val;
//     } else {
//       return num;
//     }
//   });

//   setSizes(newSizes);
// };

// const editQuantities = async () => {
//   try {
//     const token = await currentUser?.getIdToken();

//     const body = {
//       status: orderStatus,
//       numDiapers: sizes.reduce((partialSum, a) => partialSum + a, 0),
//       newborn: sizes[0],
//       size1: sizes[1],
//       size2: sizes[2],
//       size3: sizes[3],
//       size4: sizes[4],
//       size5: sizes[5],
//       size6: sizes[6],
//       orderId: order.id,
//     };

//     const response = await fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/order`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       }
//     );

//   } catch (error) {
//     console.error("Error: " + error);
//   }
// };

// const handleSubmit = async (event: FormEvent) => {
//   try {
//     event.preventDefault();
//     await editQuantities();
//     close();
//     window.location.reload()
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// };

// const sizeInputs = sizes.map((val: number, index: number) => {
//   return (
//     <NumberInput
//       key={index}
//       label={index === 0 ? "Newborn" : "Size " + index}
//       placeholder="Enter Quantity"
//       defaultValue={val}
//       className={index === 0 ? "modal-input" : "quantity-input"}
//       size="md"
//       allowDecimal={false}
//       allowNegative={false}
//       onChange={(val) => handleQuantityChange(Number(val), index)}
//     />
//   );
// });

// const checkboxes = values.map((value, index) => (
//   <Checkbox
//     key={value.key}
//     label={value.label}
//     checked={value.checked}
//     onChange={() => handleCheckboxChange(index)}
//     className="submit-element"
//     radius="xl"
//     size="md"
//   />
// ));

// return (
//   <>
//     <div onClick={open}>{children}</div>
//     <Modal
//       opened={opened}
//       onClose={close}
//       withCloseButton={false}
//       centered
//       size="xl"
//     >
//       <div className="header">
//         <Title ta="center" order={2}>
//           Edit Order
//         </Title>
//       </div>
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="form-inputs">
//           {sizeInputs[0]}
//           <div className="quantity-inputs-container">
//             {sizeInputs.slice(1)}
//           </div>
//         </div>

//         <div className="submit-panel">
//           {checkboxes}
//           <Button
//             className="submit-button"
//             variant="filled"
//             type="submit"
//             size="md"
//           >
//             Submit
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   </>
// );
