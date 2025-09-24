import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/admin";

function UserMenu() {
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      alert("Logout successful");
    },
    onError: (error) => {
      console.error("Logout error details:", error);
      alert(`Logout failed: ${error.message}`);
    },
  });
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    mutation.mutate(token);
  };
  return (
    <div>
      <p>Welcome, User!</p>
      <button onClick={handleLogout} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
export default UserMenu;
