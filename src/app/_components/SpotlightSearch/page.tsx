"use client";

import { Button, Group, rem, Text } from "@mantine/core";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import {
  IconBookmark,
  IconDashboard,
  IconDeviceMobile,
  IconFileText,
  IconHome,
  IconReportMoney,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export interface Props {
  closeDrawer: typeof close;
}

function SpotlightControl({ closeDrawer }: Props) {
  return (
    <Button
      variant="default"
      onClick={() => {
        spotlight.open();
        closeDrawer();
      }}
    >
      <IconSearch size={16} stroke={3} />
      <Group gap="xs" style={{ padding: "0px 80px 0px 0px" }} ml="md">
        <Text c="dimmed" fw={1}>
          Search Blog
        </Text>
      </Group>
      <Group>
        <Text
          variant="text"
          style={{
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "11px",
            borderRadius: "4px",
            border: "1px solid",
            padding: "4px 7px",
            lineHeight: 1,
          }}
          size="xs"
          c="dimmed"
        >
          Ctrl+K
        </Text>
      </Group>
    </Button>
  );
}

export function SpotlightSearch({ closeDrawer }: Props) {
  const router = useRouter();

  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => {
        console.log("Home");
        void router.push("/");
      },
      leftSection: (
        <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
      ),
    },
    {
      id: "features",
      label: "Features",
      description: "Get full information about current system status",
      onClick: () => {
        console.log("Features");
        void router.push("/features");
      },
      leftSection: (
        <IconDashboard
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
    {
      id: "support",
      label: "Support",
      description: "Visit FAQ to lean more about all feature queries",
      onClick: () => {
        console.log("Support");
        void router.push("/support");
      },
      leftSection: (
        <IconFileText
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
    {
      id: "pricing",
      label: "Pricing",
      description: "Check out our pricing section for your demands",
      onClick: () => {
        console.log("Pricing");
        void router.push("/pricing");
      },
      leftSection: (
        <IconReportMoney
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
    {
      id: "bookDemo",
      label: "Book Demo",
      description: "Request a Demo now",
      onClick: () => {
        console.log("BookDemo");
        void router.push("/bookdemo");
      },
      leftSection: (
        <IconBookmark
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
    {
      id: "contact",
      label: "Contact Us",
      description: "Get in touch with us for any query",
      onClick: () => {
        console.log("Contact Us");
        void router.push("/contacts");
      },
      leftSection: (
        <IconDeviceMobile
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    },
  ];

  return (
    <>
      <SpotlightControl closeDrawer={closeDrawer} />
      <Spotlight
        actions={actions}
        searchProps={{
          leftSection: <IconSearch size={18} />,
          placeholder: "Search...",
        }}
        shortcut={["mod + P", "mod + K", "/"]}
        highlightQuery
        scrollable
        nothingFound="Nothing found..."
      >
      </Spotlight>
    </>
  );
}
