import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "../../theme";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { HeaderMegaMenu } from "./_components/HeaderMegaMenu/page";
import { NextAuthProvider } from "./providers";

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
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <NextAuthProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              <HeaderMegaMenu />
              {children}
            </TRPCReactProvider>
          </NextAuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
