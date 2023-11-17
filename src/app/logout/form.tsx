"use client";

import { Button, Center, Group, Paper, Text } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function LogoutForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <Center h="80vh">
      <Paper radius="md" p="xl" withBorder w={400}>
        <Text size="lg" fw={500} m="auto">
          Are you sure you want to sign out?
        </Text>

        <Group grow mb="md" mt="md">
          <Button
            leftSection={<IconDoorExit />}
            variant="outline"
            radius="xl"
            onClick={() =>
              signOut({
                callbackUrl: callbackUrl,
              })}
          >
            Sign out
          </Button>
        </Group>
      </Paper>
    </Center>
  );
}
