import {
  Anchor,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  rem,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import image from "./kiota.png";
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
import { HeaderActionMenu } from "../HeaderActionMenu/page";
import { UserButton } from "../UserButton/page";
import { getServerAuthSession } from "~/server/auth";

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

export async function HeaderMegaMenu() {
  const session = await getServerAuthSession();
  const links = mockdata.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      // onClick={() => {
      //   closeDrawer();
      // }}
      component={Link}
      href={item.link}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color="var(--mantine-color-blue-6)"
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
    <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" className={classes.logo}>
            <Image
              width={150}
              height={50}
              object-fit="contain"
              src={image.src}
              alt="Kiotapay"
            />
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCardTarget>
                <Link href="/features" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color="var(--mantine-color-blue-6)"
                    />
                  </Center>
                </Link>
              </HoverCardTarget>

              <HoverCardDropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Link href="/features" passHref legacyBehavior>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Link>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing="sm">
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Manage billing, collections, payments and other records
                        with ease
                      </Text>
                    </div>
                    <Button
                      component={Link}
                      href="/bookdemo"
                      variant="default"
                    >
                      Get started
                    </Button>
                  </Group>
                </div>
              </HoverCardDropdown>
            </HoverCard>
            <Link href="/support" className={classes.link}>
              Support
            </Link>
            <Link href="/pricing" className={classes.link}>
              Pricing
            </Link>

            <Link href="/blog" className={classes.link}>
              Blog
            </Link>

            <Link href="/contacts" className={classes.link}>
              Contact Us
            </Link>
          </Group>

          <HeaderActionMenu>
            <Button
              variant="outline"
              leftSection={<Avatar src={session?.user.image} size="sm" />}
              component={Link}
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
            >
              {session ? "Sign out" : "Sign in"}
            </Button>
          </HeaderActionMenu>
        </Group>
      </header>
    </Box>
  );
}
