import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { Navbar } from "./navbar/navbar";
import styles from "./layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <span className={styles.grid}>
    <Header />
    <Navbar />
    <main className={styles.content} role="main">
      {children}
    </main>
    <Footer />
  </span>
);
