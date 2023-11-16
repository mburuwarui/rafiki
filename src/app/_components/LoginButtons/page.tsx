"use client";

import { Button, Group } from "@mantine/core";
import { IconBrandDiscord, IconBrandTwitter } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function LoginButtons(
  { provider, session }: { provider: any; session: string; },
) {
  if (session) {
    return { redirect: { destination: "/" } };
  }
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    <>
      {provider && (
        <Group grow mb="md" mt="md" key={provider.discord.name}>
          <Button
            leftSection={<IconBrandDiscord />}
            variant="outline"
            radius="xl"
            onClick={() =>
              signIn(provider.discord.id, {
                callbackUrl: callbackUrl,
              })}
          >
            {provider.discord.name}
          </Button>

          <Button
            leftSection={<IconBrandTwitter />}
            variant="outline"
            radius="xl"
            onClick={() =>
              signIn(provider.discord.id, {
                callbackUrl: callbackUrl,
              })}
          >
            Twitter
          </Button>
        </Group>
      )}
    </>
  );
}
