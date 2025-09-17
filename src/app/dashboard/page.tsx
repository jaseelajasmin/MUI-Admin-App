"use client";

import { useEffect, useState } from "react";
import { ProductAPI, CategoryAPI } from "../lib/api";
import { Typography, Box, Card, CardContent } from "@mui/material";

export default function DashboardPage() {
  const [productsCount, setProductsCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await ProductAPI.getAll();
        const allCategories = await CategoryAPI.getAll();
        setProductsCount(allProducts.length);
        setCategoriesCount(allCategories.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Card sx={{ backgroundColor: "#1976d2", color: "#fff", flex: "1 1 300px" }}>
          <CardContent>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">{productsCount}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#ff9800", color: "#fff", flex: "1 1 300px" }}>
          <CardContent>
            <Typography variant="h6">Total Categories</Typography>
            <Typography variant="h4">{categoriesCount}</Typography>
          </CardContent>
        </Card>

        {/* Add more cards here */}
      </Box>
    </Box>
  );
}
