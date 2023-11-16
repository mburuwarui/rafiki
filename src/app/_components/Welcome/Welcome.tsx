import { Anchor, Text, Title } from "@mantine/core";
import Image from "next/image";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "green", to: "lime" }}
        >
          rafiki
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" my="xs">
        This starter Next.js project includes a minimal setup for server side
        rendering, if you want to learn more on Mantine + Next.js integration
        follow{" "}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
      <Image
        width={600}
        height={200}
        src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
        alt="Background Image"
        style={{ objectFit: "cover", borderRadius: "10px" }}
        quality={100}
      />
    </>
  );
}
