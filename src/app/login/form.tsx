"use client";

import {
  Anchor,
  Button,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToggle } from "@mantine/hooks";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { validate, values, getInputProps } = useForm({
    initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 7 ? "password must have at least 7 numbers" : null,
    },
  });

  const [type, toggle] = useToggle(["login", "register"]);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/profile";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        notifications.show({
          title: "Error submitting",
          color: "red",
          message: "Invalid email or password",
          autoClose: false,
          withBorder: true,
        });
      }
    } catch (error) {
      setLoading(false);
      notifications.show({
        title: "Error submitting",
        color: "red",
        message: "Invalid email or password",
        autoClose: false,
        withBorder: true,
      });
    }
  };

  return (
    <Center h="80vh">
      <Paper radius="md" p="xl" withBorder w={400}>
        <Text size="lg" fw={500} m="auto">
          Welcome to rafiki, {type} with
        </Text>
        {children}
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              required
              placeholder="Email address"
              {...getInputProps("email")}
            />
            <TextInput
              required
              placeholder="Password"
              {...getInputProps("password")}
            />
          </Stack>
          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" disabled={loading}>
              {loading ? "loading..." : "Sign In"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};
