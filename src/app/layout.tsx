import { ReactNode } from "react";
import Navbar from "../app/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Next.js Admin Panel with Products & Categories",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}