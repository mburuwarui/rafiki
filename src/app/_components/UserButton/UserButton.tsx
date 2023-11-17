import { Avatar, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { getServerAuthSession } from "~/server/auth";
import classes from "./UserButton.module.css";

export async function UserButton() {
  const session = await getServerAuthSession();
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src={session?.user.image}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {session && <span>{session.user?.name}</span>}
          </Text>

          <Text c="dimmed" size="xs">
            {session && <span>{session.user?.email}</span>}
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
