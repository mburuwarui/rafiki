import { Button, Avatar } from "@mantine/core";
import { getServerAuthSession } from "~/server/auth";
import Link from 'next/link';

export async function AuthButton()  {
  const session = await getServerAuthSession();


  return (
    <Button
      variant="outline"
      leftSection={<Avatar src={session?.user.image} size="sm" />}
      component={Link}
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
    >
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
};
