import React, { useState, useEffect, FormEvent } from "react";
import "@mantine/dates/styles.css";
import "./OrderPopup.css";
import { randomId, useDisclosure, useListState } from "@mantine/hooks";
import { Modal, Button, Title, NumberInput, Checkbox } from "@mantine/core";
import Order from "./Order/OrderClass";
import { useAuth } from "../AuthContext";

const OrderPopup: React.FC<{
  children: React.ReactNode;
  order: Order;
  updateOrder: (updatedOrder: Order) => void;
}> = ({ children, order, updateOrder }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const [numDiapers, setNumDiapers] = useState<number>(order.numDiapers);
  const [orderStatus, setOrderStatus] = useState<string>(order.status);
  const [sizes, setSizes] = useState<number[]>(order.diaperDist);
  const { getUser, isStaff, currentUser } = useAuth();
  const user = getUser();

  //Mantine Checkbox use
  const initialValues = [
    {
      label: "Unreviewed",
      checked: order.status === "PLACED",
      key: randomId(),
      backendValue: "PLACED",
    },
    {
      label: "Filled",
      checked: order.status === "FILLED",
      key: randomId(),
      backendValue: "FILLED",
    },
    {
      label: "In Progress",
      checked: order.status === "APPROVED" || order.status === "OPEN",
      key: randomId(),
      backendValue: "OPEN",
    },
  ];

  const [values, handlers] = useListState(initialValues);

  const handleCheckboxChange = (index: any) => {
    handlers.setState((current) =>
      current.map((value, i) => ({ ...value, checked: i === index }))
    );

    const checkedStatus = values[index]?.backendValue ?? "PLACED";
    setOrderStatus(checkedStatus);
    console.log(checkedStatus);
  };

  const handleQuantityChange = (val: number, index: number) => {
    const newSizes = sizes.map((num, i) => {
      if (index === i) {
        return val;
      } else {
        return num;
      }
    });

    setSizes(newSizes);
  };

  const editQuantities = async () => {
    try {
      const token = await currentUser?.getIdToken();

      const body = {
        status: orderStatus,
        numDiapers: sizes.reduce((partialSum, a) => partialSum + a, 0),
        newborn: sizes[0],
        size1: sizes[1],
        size2: sizes[2],
        size3: sizes[3],
        size4: sizes[4],
        size5: sizes[5],
        size6: sizes[6],
        orderId: order.id,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      updateOrder(
        new Order(
          order.id,
          order.datePlaced,
          order.dateCompleted,
          orderStatus,
          ...sizes
        )
      );
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await editQuantities();
      close();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const sizeInputs = sizes.map((val: number, index: number) => {
    return (
      <NumberInput
        label={index === 0 ? "Newborn" : "Size " + index}
        placeholder="Enter Quantity"
        defaultValue={val}
        className={index === 0 ? "modal-input" : "quantity-input"}
        size="md"
        allowDecimal={false}
        allowNegative={false}
        onChange={(val) => handleQuantityChange(Number(val), index)}
      />
    );
  });

  const checkboxes = values.map((value, index) => (
    <Checkbox
      key={value.key}
      label={value.label}
      checked={value.checked}
      onChange={() => handleCheckboxChange(index)}
      className="submit-element"
      radius="xl"
      size="md"
    />
  ));

  return (
    <>
      <div onClick={open}>{children}</div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="xl"
      >
        <div className="header">
          <Title ta="center" order={2}>
            Edit Order
          </Title>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            {sizeInputs[0]}
            <div className="quantity-inputs-container">
              {sizeInputs.slice(1)}
            </div>
          </div>

          <div className="submit-panel">
            {checkboxes}
            <Button
              className="submit-button"
              variant="filled"
              type="submit"
              size="md"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrderPopup;
