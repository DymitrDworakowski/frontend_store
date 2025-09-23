const API_URL = "https://backendstore-production.up.railway.app";

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
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error("Failed to logout");
  return res.json();
}
