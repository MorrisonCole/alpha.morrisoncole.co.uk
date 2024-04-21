import { Metadata } from "next";
import "./globals.css";
import "@pigment-css/react/styles.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
