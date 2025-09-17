const API = "https://api.escuelajs.co/api/v1";

function getHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export const ProductAPI = {
  getAll: async () => (await fetch(`${API}/products`)).json(),
  create: async (product: any) =>
    (await fetch(`${API}/products`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(product),
    })).json(),
  update: async (id: number, product: any) =>
    (await fetch(`${API}/products/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(product),
    })).json(),
  remove: async (id: number) =>
    (await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })).json(),
};

export const CategoryAPI = {
  getAll: async () => (await fetch(`${API}/categories`)).json(),
  create: async (category: any) =>
    (await fetch(`${API}/categories`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(category),
    })).json(),
  update: async (id: number, category: any) =>
    (await fetch(`${API}/categories/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(category),
    })).json(),
  remove: async (id: number) =>
    (await fetch(`${API}/categories/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })).json(),
};