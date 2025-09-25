const API_URL = 'https://backendstore-production.up.railway.app';

export async function getProducts({ 
  page = 1, 
  limit = 10, 
  search = "", 
  category, 
  minPrice, 
  maxPrice, 
  sort = "createdAt:desc" 
}) {
  // Ensure sort is always a string
  const sortParam = typeof sort === "string" && sort.length > 0 ? sort : "createdAt:desc";
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