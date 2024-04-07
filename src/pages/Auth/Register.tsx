import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import {
  Title,
  Flex,
  Text,
  TextInput,
  Button,
  Container,
  Divider,
  PasswordInput,
  Checkbox,
  Group,
  Stack,
  NumberInput,
  Modal,
} from "@mantine/core";
import FormError from "./FormError";
import { IconCircleDashed, IconCircleFilled } from "@tabler/icons-react";
import "../../styles/Register.css";
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  maxDiapers?: number;
}

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const Register: React.FC<{
  openModal: boolean, closeModal: () => void
}> = ({ openModal, closeModal }) => {
  // Changed
  const [partnerChecked, setPartnerChecked] = useState(false);
  const [staffChecked, setStaffChecked] = useState(false);
  const { registerUser, currentUser } = useAuth();
  const navigate = useNavigate();


  const [showPartnerFields, setShowPartnerFields] = useState(false);

  // useEffect(() => {
  //   console.log(openModal);
  // }, [openModal])

  const handlePartnerClick = () => {
    if (!staffChecked) {
      setPartnerChecked(!partnerChecked);
      setShowPartnerFields(!partnerChecked);
    } else {
      setStaffChecked(false);
      setPartnerChecked(!partnerChecked);
      setShowPartnerFields(!partnerChecked);
    }
  };

  const handleStaffClick = () => {
    if (!partnerChecked) {
      setStaffChecked(!staffChecked);
    } else {
      setPartnerChecked(false);
      setShowPartnerFields(false);
      setStaffChecked(!staffChecked);
    }
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      //TODO HANDLE CREATING STAFF VS USER HERE
      // await registerUser(
      //   values.firstName,
      //   values.lastName,
      //   values.email,
      //   values.password,
      //   false
      // );

      // closeModal();
      navigate("/user-dir"); // Redirect to home page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Modal.Root
      opened={openModal}
      onClose={closeModal}
      size="70%"
      style={{ alignItems: "center" }}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Modal.Title
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            Create User
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Container mt="1rem" className="dashboard-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text className="header-size">User Type</Text>
              <Divider my="sm" />

              <Group mt="1rem" className="auth-input" align="center">
                <Group gap={7} align="center">
                  <Button
                    onClick={handlePartnerClick}
                    style={{
                      borderColor: partnerChecked
                        ? "var(--primary-color)"
                        : "var(--button-outline-color)",
                      backgroundColor: "transparent",
                    }}

                  // variant={partnerChecked ? "filled" : "light"}
                  // color={partnerChecked ? "violet" : "gray"}
                  >
                    {partnerChecked ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                          left: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        onClick={handlePartnerClick}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="7"
                          fill="var(--primary-color)"
                          stroke="var(--primary-color)"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <IconCircleDashed
                        size={16}
                        color="var(--button-outline-color)"
                        style={{
                          position: "absolute",
                          left: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        onClick={handlePartnerClick}
                      />
                    )}
                    <Text style={{ marginLeft: "32px", fontWeight: 700 }}>
                      Partner
                    </Text>
                  </Button>
                  <Button
                    onClick={handleStaffClick}
                    style={{
                      borderColor: staffChecked
                        ? "var(--primary-color)"
                        : "var(--button-outline-color)",
                      backgroundColor: "transparent",
                    }}
                  // variant={staffChecked ? "filled" : "light"}
                  // color={staffChecked ? "violet" : "gray"}
                  >
                    {staffChecked ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                          left: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        onClick={handleStaffClick}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="7"
                          fill="var(--primary-color)"
                          stroke="var(--primary-color)"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <IconCircleDashed
                        size={16}
                        color="var(--button-outline-color)"
                        style={{
                          position: "absolute",
                          left: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        onClick={handleStaffClick}
                      />
                    )}
                    <Text style={{ marginLeft: "32px", fontWeight: 700 }}>
                      Staff
                    </Text>
                  </Button>
                  {showPartnerFields && (
                    <>
                      <NumberInput
                        w="10rem"
                        // className="auth-input"
                        clampBehavior="strict"
                        max={300}
                        placeholder="ex. 300"
                        allowDecimal={false}
                        allowNegative={false}
                        decimalSeparator=","
                        onChange={(value) => {
                          register("maxDiapers").onChange({
                            target: {
                              value: value,
                              type: "number",
                            },
                          });
                        }}
                        error={errors.maxDiapers && errors.maxDiapers.message}
                      />
                      <Text ml="0.7rem">Maximum Diapers / Month</Text>
                    </>
                  )}
                  {/* <Checkbox
                      labelPosition="right"
                      style={{ 
                        borderRadius: '9999px',
                        order: "var(--_checkbox-inner-order, 0)"
                      }}
                      radius="xs"
                      checked={partnerChecked}
                      color="var(--primary-color)"
                      onChange={(event) => {
                        if (!staffChecked) {
                          setPartnerChecked(event.currentTarget.checked);
                          setShowPartnerFields(event.currentTarget.checked);
                        } else {
                          setStaffChecked(false);
                          setPartnerChecked(event.currentTarget.checked);
                          setShowPartnerFields(event.currentTarget.checked);
                        }
                      }}
                    
                    />

                    <Text>Partner</Text>
                  </Group>
                  <Group gap={7} align="center">
                    <Checkbox
                      labelPosition="right"
                      style={{ order: "var(--_checkbox-inner-order, 0)" }}
                      radius="xs"
                      checked={staffChecked}
                      color="var(--primary-color)"
                      onChange={(event) => {
                        if (!partnerChecked) {
                          setStaffChecked(event.currentTarget.checked);
                        } else {
                          setPartnerChecked(false);
                          setShowPartnerFields(false);
                          setStaffChecked(event.currentTarget.checked);
                        }
                      }}
                    /> 
                    <Text>Staff</Text>*/}
                </Group>
              </Group>

              <Text className="header-size" mt="2rem">
                Personal Information
              </Text>
              <Divider my="sm" />
              <Group grow justify="space-between">
                <TextInput
                  label="First Name"
                  className="auth-input"
                  {...register("firstName")}
                  error={errors.firstName != null && errors.firstName.message}
                />
                <TextInput
                  label="Last Name"
                  className="auth-input"
                  {...register("lastName")}
                  error={errors.lastName != null && errors.lastName.message}
                />
              </Group>

              <TextInput
                label="Email Address"
                className="auth-input"
                {...register("email")}
                error={errors.email != null && errors.email.message}
              />
              <Text className="header-size" mt="2rem">
                Login
              </Text>
              <Divider my="sm" />
              <Group grow justify="space-between">
                <PasswordInput
                  className="auth-input"
                  label="Password"

                  {...register("password")}
                  error={errors.password != null && errors.password.message}
                />
                <PasswordInput
                  className="auth-input"
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  error={
                    errors.confirmPassword != null &&
                    errors.confirmPassword.message
                  }
                />
              </Group>

              {error && <FormError>{error}</FormError>}
            </form>
          </Container>
          <Group style={{ justifyContent: "center" }}>
            <Button
              radius="xl"
              disabled={isSubmitting}
              type="submit"
              style={{
                backgroundColor: "var(--primary-color)",
                width: "10rem",
                // width: "calc(100% - 20px)", // Adjust according to your desired margin width
                // marginLeft: "10px", // Left margin
                // marginRight: "10px", // Right margin
                marginTop: "10px",
              }}
            >
              {isSubmitting ? "Submitting" : "Create User"}
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>

  );
};

export default Register;



{/* <Stack m={40}>
        <Title c="black" ta={{base: "center", sm: "left"}} order={1}> Create User</Title>
      </Stack> */}

{/* Commented */ }
{/* <Container mt="lg" className="dashboard-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group grow justify="space-between">
            <TextInput
              label="First Name"
              className="auth-input"
              {...register("firstName")}
              error={errors.firstName != null && errors.firstName.message}
            />
            <TextInput
              label="Last Name"
              className="auth-input"
              {...register("lastName")}
              error={errors.lastName != null && errors.lastName.message}
            />
          </Group>

          <TextInput
            label="Email Address"
            className="auth-input"
            {...register("email")}
            error={errors.email != null && errors.email.message}
          />

          <Group grow justify="space-between">
            <PasswordInput
              className="auth-input"
              label="Password"
              {...register("password")}
              error={errors.password != null && errors.password.message}
            />
            <PasswordInput
              className="auth-input"
              label="Confirm Password"
              {...register("confirmPassword")}
              error={
                errors.confirmPassword != null && errors.confirmPassword.message
              }
            />
          </Group>
          <Text fw="500px">Are You Registering a Partner or a Staff?</Text>
          <Group mt="1rem" className="auth-input" align="center">
            <Group gap={7} align="center">
              <Checkbox
                labelPosition="right"
                style={{ order: "var(--_checkbox-inner-order, 0)" }}
                radius="xs"
                checked={partnerChecked}
                onChange={(event) => {
                  if (!staffChecked) {
                    setPartnerChecked(event.currentTarget.checked);
                    setShowPartnerFields(event.currentTarget.checked);
                  } else {
                    setStaffChecked(false);
                    setPartnerChecked(event.currentTarget.checked);
                    setShowPartnerFields(event.currentTarget.checked);
                  }
                }}
              />

              <Text>Partner</Text>
            </Group>
            <Group gap={7} align="center">
              <Checkbox
                style={{ order: "var(--_checkbox-inner-order, 0)" }}
                radius="xs"
                checked={staffChecked}
                onChange={(event) => {
                  if (!partnerChecked) {
                    setStaffChecked(event.currentTarget.checked);
                  } else {
                    setPartnerChecked(false);
                    setShowPartnerFields(false);
                    setStaffChecked(event.currentTarget.checked);
                  }
                }}
              />
              <Text>Staff</Text>
            </Group>
          </Group>

          {showPartnerFields && (
            <>
              <NumberInput
                w="20rem"
                className="auth-input"
                clampBehavior="strict"
                max={300}
                label="Max Diapers"
                placeholder="Enter max diapers"
                allowDecimal={false}
                allowNegative={false}
                decimalSeparator=","
                onChange={(value) => {
                  register("maxDiapers").onChange({
                    target: {
                      value: value,
                      type: "number",
                    },
                  });
                }}
                error={errors.maxDiapers && errors.maxDiapers.message}
              />
            </>
          )}

          {error && <FormError>{error}</FormError>}
        </form>
        <Divider size="xs" className="divider" />
      </Container>
      <Button
        fullWidth
        radius="xl"
        disabled={isSubmitting}
        type="submit"
        style={{ backgroundColor: "#804d7a" }}
      >
        {isSubmitting ? "Submitting" : "Create User"}
      </Button> */}
