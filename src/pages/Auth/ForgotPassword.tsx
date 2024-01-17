import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import FormError from "./FormError";
import { Button, TextInput, Title, Text, Divider } from "@mantine/core";

interface FormValues {
  email: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const { forgotPassword, currentUser } = useAuth();
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

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      await forgotPassword(values.email);
      setMessage("Check your email for further instructions");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Title order={1}>Forgot Password</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email Address"
          className="auth-input"
          {...register("email")}
          error={(errors.email != null) && errors.email.message}
        />
        {error && <FormError>{error}</FormError>}
        <Button fullWidth disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting" : "Send Email"}
        </Button>
        <Text size="sm">{message && <p>{message}</p>}</Text>
      </form>
      <Divider size="xs" className="divider" />
      <Text size="sm">
        <Link to="/login">Back to login</Link>
      </Text>
    </>
  );
};

export default ForgotPassword;
