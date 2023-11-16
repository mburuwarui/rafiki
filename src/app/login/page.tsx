import { useSearchParams } from "next/navigation";
import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { LoginButtons } from "../_components/LoginButtons/page";
import { LoginForm } from "./form";

export default async function LoginPage() {
  const provider = await getProviders();
  const session = await getServerAuthSession();

  return (
    <LoginForm>
      <LoginButtons provider={provider} session={session} />
    </LoginForm>
  );
}
