import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header";
// import { StyledEngineProvider } from "@mui/material";
import { SessionProvider } from "./SessionProvider";
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
                <SessionProvider>
                    {/* <StyledEngineProvider injectFirst> */}
                    <Header />
                    {children}
                    {/* </StyledEngineProvider> */}
                </SessionProvider>
            </body>
        </html>
    );
}
