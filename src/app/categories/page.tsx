"use client";

import { useEffect, useState } from "react";
import { CategoryAPI } from "../lib/api";
import { Category } from "../types";
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
} from "@mui/material";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const fetchData = async () => setCategories(await CategoryAPI.getAll());

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await CategoryAPI.create({ ...newCategory, image: "https://placeimg.com/640/480/any" });
    setNewCategory({ name: "" });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await CategoryAPI.remove(id);
    fetchData();
  };

  const handleUpdate = async () => {
    if (editCategory) {
      await CategoryAPI.update(editCategory.id, {
        name: editCategory.name,
        image: editCategory.image || "https://placeimg.com/640/480/any", // fallback
      });
      setEditCategory(null);
      fetchData();
    }
  };

  const getCategoryImage = (category: Category) =>
    category.image && category.image !== "" ? category.image : "/placeholder.png"; // fallback from public folder

  return (
    <ProtectedRoute>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>

      {/* Create */}
      <Box display="flex" mb={2}>
        <TextField
          label="Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ name: e.target.value })}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      {/* List */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {categories.map((c) => (
          <Card key={c.id} sx={{ flex: "1 1 300px" }}>
            <CardMedia
              component="img"
              height="200"
              image={getCategoryImage(c)}
              alt={c.name}
              sx={{ objectFit: "cover" }} // makes image fully visible in card
            />
            <CardContent>
              <Typography variant="h6">{c.name}</Typography>
              <Button onClick={() => setEditCategory(c)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(c.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Update Dialog */}
      <Dialog open={!!editCategory} onClose={() => setEditCategory(null)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="dense"
            value={editCategory?.name || ""}
            onChange={(e) =>
              setEditCategory({ ...editCategory!, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCategory(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ProtectedRoute>
  );
}
