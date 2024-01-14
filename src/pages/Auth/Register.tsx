import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import { Title, Flex, Text, TextInput, Button, Container, Divider, PasswordInput, Checkbox, Group } from '@mantine/core';
import FormError from "./FormError";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

const Register: React.FC = () => {
  const { registerUser, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

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
      await registerUser(values.firstName, values.lastName, values.email, values.password, false);

      navigate("/"); // Redirect to home page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Title order={1}>Register</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group grow justify="space-between">
          <TextInput
            label="First Name"
            className="auth-input"
            {...register("firstName")}
            error={(errors.firstName != null) && errors.firstName.message}
          />
          <TextInput
            label="Last Name"
            className="auth-input"
            {...register("lastName")}
            error={(errors.lastName != null) && errors.lastName.message}
          />
        </Group>

        <TextInput
          label="Email Address"
          className="auth-input"
          {...register("email")}
          error={(errors.email != null) && errors.email.message}
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
            error={errors.confirmPassword != null && errors.confirmPassword.message}
          />
        </Group>

        {error && <FormError>{error}</FormError>}
        <Button fullWidth disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting" : "Register"}
        </Button>
      </form>
      <Divider size="xs" className="divider" />
      <Text size="sm">
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </>
  );
};

export default Register;
