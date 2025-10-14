import client, { authHeader } from "./client";

export async function userRegister(data) {
  try {
    const res = await client.post(`/users/register`, data);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to register");
  }
}

export async function adminLogin(credentials) {
  try {
    const res = await client.post(`/users/login`, credentials);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to login");
  }
}

export async function logout(token) {
  try {
    const res = await client.post(
      `/users/logout`,
      {},
      { headers: authHeader(token) }
    );
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to logout");
  }
}

export async function addItems({ token, itemData }) {
  try {
    const res = await client.post(`/admin/products`, itemData, {
      headers: authHeader(token),
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to add item");
  }
}

export async function editItem({ token, itemId, itemData }) {
  try {
    const res = await client.put(`/admin/products/${itemId}`, itemData, {
      headers: authHeader(token),
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to edit item");
  }
}

export async function deleteItem({ token, itemId }) {
  try {
    const res = await client.delete(`/admin/products/${itemId}`, {
      headers: authHeader(token),
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to delete item");
  }
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

  try {
    const res = await client.get(`/products?${params.toString()}`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to fetch products");
  }
}
