import React, { FormEvent, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Stack,
  Container,
  Group,
  Text,
  NumberInput,
  Title,
} from "@mantine/core";
import "./EditInventoryModal.css";
import { InventoryResponse } from "./StaffDashboard";
import { useAuth } from "../../AuthContext";

const EditInventoryModal: React.FC<{
  inventory: InventoryResponse;
  setInventory: React.Dispatch<React.SetStateAction<InventoryResponse>>;
}> = ({ inventory, setInventory }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { currentUser } = useAuth();

  const sizeInputs = Object.keys(inventory.unwrapped).map((size, index) => {
    let lineTotal =
      (inventory.wrapped?.[size] ?? 0) + (inventory.unwrapped?.[size] ?? 0);
    const sizeLabels = [
      "Newborn",
      "Size 1",
      "Size 2",
      "Size 3",
      "Size 4",
      "Size 5",
      "Size 6",
    ];
    return (
      <Container w="100%" fluid mt="7">
        <Group style={{ width: "100%" }} grow gap="xl">
          <Text className="table-element bold">{sizeLabels[index]}</Text>
          <NumberInput
            className="table-element"
            placeholder="Enter Quantity"
            defaultValue={inventory.unwrapped[size]}
            onChange={(val) => handleChange(Number(val), size, false)}
          />
          <NumberInput
            className="table-element"
            placeholder="Enter Quantity"
            defaultValue={inventory.wrapped[size]}
            onChange={(val) => handleChange(Number(val), size, true)}
          />

          <Text className="table-element">{lineTotal}</Text>
        </Group>
      </Container>
    );
  });

  const handleChange = (input: number, size: string, isWrapped: boolean) => {
    //size used to access inventory field.
    const newInventory = { ...inventory };

    if (isWrapped) {
      newInventory.wrapped[size] = input;
    } else {
      newInventory.unwrapped[size] = input;
    }

    console.log(newInventory);
    setInventory(newInventory);
  };

  //Sends a put request to backend.
  const updateInventory = async () => {
    try {
      const token = await currentUser?.getIdToken();
      console.log(JSON.stringify(inventory));

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/inventory`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inventory),
        }
      );

      console.log(response);
    } catch (error) {
      console.log("ERROR " + error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    try {
      e.preventDefault();
      updateInventory();
      close();
    } catch (error) {
      console.error("ERROR " + error);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="auto"
      >
        <div className="header">
          <Title ta="center" order={2}>
            Edit Inventory
          </Title>
        </div>

        <form onSubmit={handleSubmit}>
          <Stack gap="xs" className="container form">
            <Container w="100%" fluid mt="7" className="table-header">
              <Group style={{ width: "100%" }} grow gap="xl">
                <Text className="table-element bold">Size</Text>
                <Text className="table-element bold">Unwrapped</Text>
                <Text className="table-element bold">Wrapped</Text>
                <Text className="table-element bold">Total</Text>
              </Group>
            </Container>
            {sizeInputs}
          </Stack>

          <Button className="submit" type="submit">
            Submit Changes
          </Button>
        </form>
      </Modal>

      <Button onClick={open} size="lg">
        Edit Inventory
      </Button>
    </>
  );
};

export default EditInventoryModal;
