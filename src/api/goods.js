import client, { authHeader } from "./client";

export async function getProducts({
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

export async function getCartItems(token) {
  try {
    const res = await client.get(`/cart`, { headers: authHeader(token) });
    return res.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Failed to fetch cart items"
    );
  }
}

export async function addToCart({token,productId,quantity}) {
  try {
    const res = await client.post(
      `/cart/add`,
      { productId, quantity },
      { headers: authHeader(token) }
    );
    return res.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Failed to add item to cart"
    );
  }
}

export async function removeFromCart({token,productId}) {
  try {
    const res = await client.post(
      `/cart/remove`,
      { productId },
      { headers: authHeader(token) }
    );
    return res.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Failed to remove item from cart"
    );
  }
}

export async function getProductById(id) {
  try {
    const res = await client.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Failed to fetch product");
  }
}
