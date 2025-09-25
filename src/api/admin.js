const API_URL = "https://backendstore-production.up.railway.app";

export async function userRegister(data) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function adminLogin(credentials) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function logout(token) {
  const res = await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error("Failed to logout");
  return res.json();
}

export async function addItems({ token, itemData }) {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function editItem({ token, itemId, itemData }) {
  const res = await fetch(`${API_URL}/admin/products/${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });
  if (!res.ok) throw new Error("Failed to edit item");
  return res.json();
}

export async function deleteItem({ token, itemId }) {
  const res = await fetch(`${API_URL}/admin/products/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}

export async function getAdminProducts({
  page = 1,
  limit = 10,
  search = "",
  category,
  minPrice,
  maxPrice,
  sort = "createdAt:desc",
}) {
  // Ensure sort is always a string
  const sortParam =
    typeof sort === "string" && sort.length > 0 ? sort : "createdAt:desc";
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  params.append("sort", sortParam);

  const res = await fetch(`${API_URL}/products?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
