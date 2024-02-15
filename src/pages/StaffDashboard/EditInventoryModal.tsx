import React, { useEffect, useState } from "react";
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


const EditInventoryModal: React.FC<{inventory: InventoryResponse}> = ({inventory}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const sizeInputs = Object.keys(inventory.unwrapped).map((size) => {
    let lineTotal = (inventory.wrapped?.[size] ?? 0) + (inventory.unwrapped?.[size] ?? 0)
    return (
      <Container w="100%" fluid mt="7">
      <Group style={{ width: "100%" }} grow gap="xl">
        <Text>{size}</Text>
        <NumberInput className="num-input" placeholder="Enter Quantity" defaultValue={inventory.unwrapped[size]} />
        <NumberInput className="num-input" placeholder="Enter Quantity" defaultValue={inventory.wrapped[size]}/>

        <Text>{lineTotal}</Text>
      </Group>
    </Container>
    )
  });
  

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
        <Stack gap="xs" className="container">
          <Container w="100%" fluid mt="7">
            <Group style={{ width: "100%" }} grow gap="xl">
              <Text>Size</Text>
              <Text>Unwrapped</Text>
              <Text>Wrapped</Text>
              <Text>Total</Text>
            </Group>
          </Container>

          {sizeInputs}
        </Stack>
      </Modal>

      <Button onClick={open}>Edit Inventory</Button>
    </>
  );
};

export default EditInventoryModal;
