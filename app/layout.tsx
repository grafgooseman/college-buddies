import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ResponsiveAppBar from "./ResponsiveAppBar";
// import { StyledEngineProvider } from "@mui/material";
import AuthProvider from "./AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Buddies",
  description: "Connect with people studying in the same college/university",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            {/* <StyledEngineProvider injectFirst> */}
            <ResponsiveAppBar />
            {children}
            {/* </StyledEngineProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
