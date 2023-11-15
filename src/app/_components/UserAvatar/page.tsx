import {
  Avatar,
  Group,
  Menu,
  rem,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export function UserAvatar() {
  const theme = useMantineTheme();
  const { data: sessionData } = useSession();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group gap={4}>
            <Avatar
              src={sessionData?.user.image}
              size="md"
              radius="xl"
            />

            {
              /**<div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {sessionData && <span>{sessionData.user?.name}</span>}
              </Text>

              <Text c="dimmed" size="xs">
                {sessionData && <span>{sessionData.user?.email}</span>}
              </Text>
            </div>**/
            }

            <IconChevronDown
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconStar
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSwitchHorizontal
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconPlayerPause
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Pause subscription
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
