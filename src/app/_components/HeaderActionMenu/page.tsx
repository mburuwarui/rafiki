"use client";

import {
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  rem,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import classes from "./HeaderMegaMenu.module.css";
import { ColorSchemeToggle } from "../ColorSchemeToggle/page";
import { SpotlightSearch } from "../SpotlightSearch/page";

const mockdata = [
  {
    icon: IconCode,
    title: "Intuitive Dashboard",
    description: "Provides a 360 link in property management",
    link: "./features#Intuitive-Dashboard",
  },
  {
    icon: IconCoin,
    title: "Advanced Reporting",
    description: "Track Your Properties At A Glance",
    link: "./features#Advanced-Reporting",
  },
  {
    icon: IconBook,
    title: "Instant Messaging",
    description: "Get notifications and real time transaction messages",
    link: "./features#Instant-Messaging",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "Say goodbye to all manual payments",
    link: "./features#Security",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "Monitor transactions from multiple customers",
    link: "./features#Analytics",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Track all payments on one dashboard",
    link: "./features#Notifications",
  },
];

export function HeaderActionMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      onClick={() => {
        closeDrawer();
      }}
      component={Link}
      href={item.link}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color="var(--mantine-color-lime-6)"
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>
      <Group visibleFrom="xl" h="100%">
        <Button
          component={Link}
          href="/bookdemo"
          variant="gradient"
          gradient={{ from: "lime", to: "green" }}
        >
          Book Demo
        </Button>
        {children}

        <SpotlightSearch closeDrawer={closeDrawer} />
        <ColorSchemeToggle />
      </Group>

      <Burger
        opened={drawerOpened}
        onClick={toggleDrawer}
        hiddenFrom="xl"
      />
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xl"
        transitionProps={{
          transition: "fade",
          duration: 150,
          timingFunction: "linear",
        }}
      >
        <ScrollArea
          h={`calc(100vh - ${rem(80)})`}
          mx="-md"
        >
          <Divider my="sm" />
          <Link
            href="/"
            className={classes.link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.lime[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link
            href="/support"
            className={classes.link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Support
          </Link>
          <Link
            href="/pricing"
            className={classes.link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className={classes.link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Blog
          </Link>
          <Link
            href="/contacts"
            className={classes.link}
            onClick={() => {
              closeDrawer();
            }}
          >
            Contact Us
          </Link>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button
              component={Link}
              href="/bookdemo"
              variant="gradient"
              gradient={{ from: "lime", to: "green" }}
              onClick={() => {
                closeDrawer();
              }}
            >
              Book Demo
            </Button>

            {children}
          </Group>
          <Group justify="center" pb="xl" px="md">
            <Container>
            </Container>
          </Group>
          <Group justify="center" pb="xl" px="md">
            <Container>
              <SpotlightSearch closeDrawer={closeDrawer} />
            </Container>
          </Group>
          <ColorSchemeToggle />
        </ScrollArea>
      </Drawer>
    </>
  );
}
