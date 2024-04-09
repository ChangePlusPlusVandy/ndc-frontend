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
  ActionIcon
} from "@mantine/core";
import { IconPencil, IconCheck } from "@tabler/icons-react"
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
      (inventory.wrapped?.[size as keyof typeof inventory.wrapped] ?? 0) +
      (inventory.unwrapped?.[size as keyof typeof inventory.unwrapped] ?? 0);
    const sizeLabels = [
      "Newborn",
      "Size 1",
      "Size 2",
      "Size 3",
      "Size 4",
      "Size 5",
      "Size 6",
    ];
    
    //Handles edit icon logic.
    const [isEditable, setIsEditable] = useState<boolean>(false);
    useEffect(() => setIsEditable(false), [opened]); //Resets feilds to uneditable after modal close
  
    return (
      <Container w="100%" fluid mt="0" style={{borderBottom: "1px solid var(--highlight-color)", padding: "1em"}} >
        <Group style={{ width: "100%"}} grow gap="xl">
          <Text className="table-element">{sizeLabels[index]}</Text>
          <NumberInput
            className="table-element"
            placeholder="Enter Quantity"
            defaultValue={inventory.unwrapped[size as keyof typeof inventory.unwrapped]}
            onChange={(val) => handleChange(Number(val), size, false)}
            allowDecimal={false}
            allowNegative={false}
            hideControls
            disabled={!isEditable}
          />
          <NumberInput
            className="table-element"
            placeholder="Enter Quantity"
            defaultValue={inventory.wrapped[size as keyof typeof inventory.wrapped]}
            onChange={(val) => handleChange(Number(val), size, true)}
            allowDecimal={false}
            allowNegative={false}
            hideControls
            disabled={!isEditable}
          />

          <Text className="table-element">{lineTotal}</Text>
          <ActionIcon className="edit-button"  
            variant="transparent" 
            color="black" 
            onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? <IconCheck /> : <IconPencil />}
          </ActionIcon>
        </Group>
      </Container>
    );
  });

  const handleChange = (input: number, size: string, isWrapped: boolean) => {
    //size used to access inventory field.
    const newInventory = { ...inventory };

    if (isWrapped) {
      newInventory.wrapped[size as keyof typeof newInventory.wrapped] = input;
    } else {
      newInventory.unwrapped[size as keyof typeof newInventory.unwrapped] = input;
    }

    setInventory(newInventory);
  };

  //Sends a put request to backend.
  const updateInventory = async () => {
    try {
      const token = await currentUser?.getIdToken();

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
        classNames={{ body: "modal" }}
        radius={24}
        size="auto"
        closeOnClickOutside={false}
      >
        <div className="header">
          <Title className="header-text" ta="center" order={1}>
            Inventory
          </Title>
        </div>

        <form onSubmit={handleSubmit}>
          <Stack className="table">
            <Container w="100%" fluid mt="7" className="table-header">
              <Group style={{ width: "100%" }} grow gap="xl">
                <Text className="table-element table-header-element">Size</Text>
                <Text className="table-element table-header-element">Unwrapped</Text>
                <Text className="table-element table-header-element">Wrapped</Text>
                <Text className="table-element table-header-element">Total</Text>
                <Text></Text>
              </Group>
            </Container>
            {sizeInputs}
          </Stack>

          <div className="submit">
            <Button className="button" type="submit">
              Submit Changes
              <IconCheck style={{padding: "1px"}} />
            </Button>
          </div>
        </form>
      </Modal>

      <Button  className="open-button" onClick={open}>
        <IconPencil style={{marginRight: "0.75em"}}/>
        Edit Inventory
      </Button>
    </>
  );
};

export default EditInventoryModal;
