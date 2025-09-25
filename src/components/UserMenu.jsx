import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as serverLogout } from "../api/admin";
import useAuth from "../hooks/useAuth";

function UserMenu() {
  const queryClient = useQueryClient();
  const { user, logout: localLogout } = useAuth();

  const mutation = useMutation({
    mutationFn: serverLogout,
    onSuccess: () => {
      // clear local auth state and token
      try { localLogout(); } catch {}
      alert("Logout successful");
      queryClient.invalidateQueries(["adminProducts"]);
    },
    onError: (error) => {
      console.error("Logout error details:", error);
      alert(`Logout failed: ${error?.message || String(error)}`);
    },
  });

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    mutation.mutate(token);
  };

  // Prefer name, then username, then email as displayed label
  const displayName = user?.name || user?.username || user?.email || "User";

  return (
    <div>
      <p>Welcome, {displayName}!</p>
      <button onClick={handleLogout} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default UserMenu;
