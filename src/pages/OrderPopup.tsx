import React, { useState, useEffect } from "react";
import "@mantine/dates/styles.css";
import "./OrderPopup.css";
import { randomId, useDisclosure, useListState } from "@mantine/hooks";
import {
  Modal,
  Button,
  Text,
  Title,
  Avatar,
  TextInput,
  NumberInput,
  ActionIcon,
  Checkbox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import OrderPopupQuantities from "./OrderPopupQuantities";


const initialValues = [
  { label: "Approved", checked: false, key: randomId() },
  { label: "Opened", checked: false, key: randomId() },
  { label: "Viewed", checked: false, key: randomId() },
];

const OrderPopup: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [value, setValue] = useState<Date | null>(null);

  const [values, handlers] = useListState(initialValues);

  const handleCheckboxChange = (index: any) => {
    handlers.setState((current) =>
      current.map((value, i) => ({ ...value, checked: i === index }))
    );
  };

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
      <Modal opened={opened} onClose={close} withCloseButton={false} centered size="xl">
        <div className="header">
          <Title ta="center" order={2}>
            Edit Order
          </Title>
        </div>
        <form className="form" onSubmit={() => console.log("Submitted")}>
          <div className="form-inputs">
              <TextInput
                className="modal-input"
                label="Partner Name"
                placeholder="Enter Name"
                size="md"
                leftSection={
                  <Avatar radius="xl" /> //TODO: Profile image
                }
              />
              <DateInput
                className="modal-input"
                value={date}
                onChange={setDate}
                label="Order Date"
                placeholder="Select Date"
                size="md"
              />
              <TextInput
                className="modal-input"
                label="Location"
                placeholder="Enter Location"
                size="md"
              />
              <NumberInput
                className="modal-input"
                label="Quantity"
                placeholder="Enter Quantity"
                size="md"
                allowDecimal={false}
                rightSection={
                    <OrderPopupQuantities />
                }
              />
          </div>

          <div className="submit-panel">
            {checkboxes}
            <Button className="submit-button" variant="filled" type="submit" size="md">Submit</Button>
          </div>
        </form>
      </Modal>

      <span onClick={open}>Order</span>
    </>
  );
};

export default OrderPopup;
