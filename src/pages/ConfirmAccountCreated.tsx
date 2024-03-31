import React, { useEffect } from "react";
import { Modal, Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import "./ConfirmAccountCreated.css";

export interface NewUserData {
  fullName: string;
  userType: "Staff" | "Partner";
  email: string;
}

interface ConfirmAccountCreatedProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newUser: NewUserData;
}

/**
 * Account creation confirmation modal
 * prop: boolean isOpen Modal will open when set to true from parent component.
 * prop: setIsOpen function to set isOpen's value
 * prop: newUser object of type NewUserData, which needs new user's full name, their user type (Staff or Partner) and email
 */
const ConfirmAccountCreated: React.FC<ConfirmAccountCreatedProps> = ({
  isOpen,
  setIsOpen,
  newUser,
}) => {
  const [opened, { open, close }] = useDisclosure(isOpen);
  const navigate = useNavigate();

  const newUserInfoText = Object.values(newUser).map(
    (value: string, index: number) => {
      const labels = ["Name", "User Type", "Email"];

      return (
        <div className="user-info-text">
          <Text className="field-name-text">{labels[index]}</Text>
          <Text className="field-values">{value}</Text>
        </div>
      );
    }
  );

  const handleReturnToDashboard = () => {
    navigate("/");
    setIsOpen(false);
    close();
  };

  useEffect(() => {
    if (isOpen) {
      open();
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        classNames={{ body: "modal" }}
        radius={16}
        closeOnClickOutside={false}
      >
        <div className="headings">
          <h1 className="title">Account created</h1>
          <Text className="subtitle">
            The user will shortly receive an email with login instructions.
          </Text>
        </div>

        <div className="user-info-container">{newUserInfoText}</div>

        <div className="button-container">
          <Button className="button button-dark" onClick={handleReturnToDashboard}>
            Go to dashboard
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmAccountCreated;
