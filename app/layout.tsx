import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { StyledEngineProvider } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Buddies",
  description: "Find friends nearby",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledEngineProvider injectFirst>
          <ResponsiveAppBar />
          {children}
        </StyledEngineProvider>
      </body>
    </html>
  );
}
