import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Head from "next/head";
import { logoMiniWhite } from "@/utils/assets";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Suspense } from "react";
import { theme } from "@/theme/theme";
import NextAuthProvider from "@/_context/auth";
import { AppWrapper } from "@/_context";
import { Loading } from "./loading";
import { SideBar } from "@/components/navbar/navbar";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import { MapProviderWithSuspense } from "@/_context/maps.provider";
import { cookies } from "next/headers";
import "@mantine/dates/styles.css";
import { viewport } from "@/base/constants";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Eunit - Хөрөнгийн үнэлгээний сайт",
    template: "Eunit | %s",
  },

  viewport: {
    viewportFit: "cover",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
  // description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("auth_token");
  return (
    <html lang="en">
      <Head>
        <link
          rel="shortcut icon"
          href={logoMiniWhite}
          type="image/png"
          sizes="32x32"
        />
        {/* <ColorSchemeScript defaultColorScheme="light" /> */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <MantineProvider
          theme={theme}
          defaultColorScheme="light"
          withGlobalClasses
          withStaticClasses
        >
          <NextAuthProvider>
            <Notifications />
            <MapProviderWithSuspense>
              <AppWrapper token={token?.value}>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </AppWrapper>
            </MapProviderWithSuspense>
          </NextAuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
