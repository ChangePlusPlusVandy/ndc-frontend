import React, { useState, useEffect, FormEvent } from "react";
import "@mantine/dates/styles.css";
import "./OrderPopup.css";
import { randomId, useDisclosure, useListState } from "@mantine/hooks";
import { Modal, Button, Title, NumberInput, Checkbox } from "@mantine/core";
import Order from "./OrderTracking/OrderClass";
import { useAuth } from "../AuthContext";

const initialValues = [
  { label: "Approved", checked: false, key: randomId() },
  { label: "Opened", checked: false, key: randomId() },
  { label: "Viewed", checked: false, key: randomId() },
];

const OrderPopup: React.FC<{ children: React.ReactNode; order: Order }> = ({
  children,
  order,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const [numDiapers, setNumDiapers] = useState<number>(order.numDiapers);
  const [values, handlers] = useListState(initialValues);

  const { logout, getUser, isStaff } = useAuth();
  const user = getUser();

  const handleCheckboxChange = (index: any) => {
    handlers.setState((current) =>
      current.map((value, i) => ({ ...value, checked: i === index }))
    );
  };
  const [sizes, setSizes] = useState<number[]>(order.diaperDist);
  const { currentUser } = useAuth();

  const handleChange = (val: number, index: number) => {
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
        status: order.status,
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
      console.log(response.json());
      // debugger;
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await editQuantities();
      close();
      window.location.reload();
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
        onChange={(val) => handleChange(Number(val), index)}
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
