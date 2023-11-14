import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import styles from "./index.module.css";
import { Button, Stack, Text } from "@mantine/core";
import { Welcome } from "./_components/Welcome/Welcome";
import { ColorSchemeToggle } from "./_components/ColorSchemeToggle/ColorSchemeToggle";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />

      <Stack align="center" mt="xl">
        <Text>
          {hello ? hello.greeting : "Loading tRPC query..."}
        </Text>

        <Text>
          {session && <span>Logged in as {session.user?.name}</span>}
        </Text>
        <Button
          component={Link}
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        >
          {session ? "Sign out" : "Sign in"}
        </Button>
      </Stack>

      <CrudShowcase />
    </>
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
          <p className={styles.showcaseText}>
            Your most recent post: {latestPost.name}
          </p>
        )
        : <p className={styles.showcaseText}>You have no posts yet.</p>}

      <CreatePost />
    </div>
  );
}
