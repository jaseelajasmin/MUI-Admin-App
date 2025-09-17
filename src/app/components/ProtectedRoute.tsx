"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type NavbarProps = {
  children: ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" component={Link} href="/products">
            Products
          </Button>
         
          <Button color="inherit" component={Link} href="/categories">
            Categories
          </Button>
           <Button color="inherit" component={Link} href="/dashboard">
          Dashboard
        </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>{children}</Box>
    </>
  );
}
