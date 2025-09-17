"use client";

import { useEffect, useState } from "react";
import { ProductAPI } from "../lib/api";
import { Product } from "../types";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
  Box,
  Pagination,
} from "@mui/material";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: 0 });
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => setProducts(await ProductAPI.getAll());

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await ProductAPI.create({
      ...newProduct,
      description: "New product",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    });
    setNewProduct({ title: "", price: 0 });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await ProductAPI.remove(id);
    fetchData();
  };

  const handleUpdate = async () => {
    if (editProduct) {
      await ProductAPI.update(editProduct.id, {
        title: editProduct.title,
        price: editProduct.price,
        description: editProduct.description,
        categoryId: editProduct.category?.id || 1,
        images: editProduct.images,
      });
      setEditProduct(null);
      fetchData();
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <ProtectedRoute>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      {/* Create */}
      <Box mb={4}>
        <TextField
          label="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <Button variant="contained" onClick={handleAdd} sx={{ ml: 1, mt: 1 }}>
          Add
        </Button>
      </Box>

      {/* List */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {currentProducts.map((p) => (
          <Box key={p.id} flex="1 1 300px">
            <Card>
              {p.images && p.images.length > 0 && (
                <CardMedia component="img" height="200" image={p.images[0]} alt={p.title} />
              )}
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography>${p.price}</Typography>
                <Button onClick={() => setEditProduct(p)}>UPDATE</Button>
                <Button color="error" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Pagination controls */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>

      {/* Update Dialog */}
      <Dialog open={!!editProduct} onClose={() => setEditProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={editProduct?.title || ""}
            onChange={(e) => setEditProduct({ ...editProduct!, title: e.target.value })}
          />
          <TextField
            fullWidth
            type="number"
            label="Price"
            margin="dense"
            value={editProduct?.price || 0}
            onChange={(e) => setEditProduct({ ...editProduct!, price: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProduct(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ProtectedRoute>
  );
}
