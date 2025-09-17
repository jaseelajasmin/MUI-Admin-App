"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      router.push("/products");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 2 }}>
      <CardContent>
        {/* Login Image */}
        <Box
          component="img"
          src="/welcome.gif" // place this file in /public folder
          alt="Login"
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: 1,
            mb: 2,
          }}
        />

        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
