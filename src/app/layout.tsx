import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";
import "prism-themes/themes/prism-night-owl.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "../../theme";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { HeaderMegaMenu } from "./_components/HeaderMegaMenu/HeaderMegaMenu";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Rafiki App",
  description: "Bootstapped by Mburu Warui",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=j, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              <Notifications />
              <HeaderMegaMenu />
              {children}
            </TRPCReactProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
