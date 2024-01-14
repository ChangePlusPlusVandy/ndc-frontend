import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";
import { Title, Text, TextInput, Button, Container, Divider, PasswordInput, Checkbox } from '@mantine/core';
import FormError from "./FormError";
import '../../styles/login.css'

interface FormValues {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const onSubmit = async (values: FormValues) => {
    try {
      setError("");
      const alal = await login(values.email, values.password);

      console.log(alal);
      navigate("/"); // Redirect to home page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <Container visibleFrom="sm" className="left-panel" />
      <div className="right-panel">
        <Title order={1}>Log in</Title>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextInput
            label="Email Address"
            className="email-input"
            {...register("email")}
            error={(errors.email != null) && errors.email.message}
          />
          <PasswordInput
            className="password-input"
            label="Password"
            {...register("password")}
            error={errors.password != null ? errors.password.message : (errors && error)}
          />
          <div className="login-auth-options">
            <Checkbox
              label="Remember Me"
            />
            <Text size="sm">
              Forgot your password? <Link to="/forgot-password">Reset</Link>
            </Text>
          </div>

          <Button fullWidth disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting" : "Login"}
          </Button>
        </form>
        <Divider size="xs" className="divider" />
        <Text size="sm">
          No account yet? <Link to="/register">Sign Up</Link>
        </Text>

      </div>

    </div >
  );
};

export default Login;
