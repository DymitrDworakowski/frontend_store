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
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  if (sort) params.append("sort", sort);

  const res = await fetch(`${API_URL}/products?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}