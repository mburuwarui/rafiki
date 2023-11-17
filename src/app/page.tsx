import Link from "next/link";

import { api } from "~/trpc/server";
import styles from "./index.module.css";
import { CreatePost } from "./_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { Button, Stack, Text } from "@mantine/core";
import { Welcome } from "./_components/Welcome/Welcome";
import { ColorSchemeToggle } from "./_components/ColorSchemeToggle/ColorSchemeToggle";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <Stack align="center">
      <Welcome />
      <ColorSchemeToggle />
      <Text>
        {hello ? hello.greeting : "Loading tRPC query..."}
      </Text>

      <Text>
        {session && <span>Logged in as {session.user?.name}</span>}
      </Text>
      <Button
        variant="outline"
        component={Link}
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
      >
        {session ? "Sign out" : "Sign in"}
      </Button>

      <CrudShowcase />
    </Stack>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className={styles.showcaseContainer}>
      {latestPost
        ? (
          <Text>
            Your most recent post: {latestPost.name}
          </Text>
        )
        : <Text>You have no posts yet.</Text>}

      <CreatePost />
    </div>
  );
}
