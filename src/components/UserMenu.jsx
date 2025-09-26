import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { logout } from "../api/admin";
import style from "./UserMenu.module.css";
import Loader from "./Loader";
function UserMenu() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      alert("Logout successful");
      queryClient.invalidateQueries(["adminProducts"]);
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

  const stored = localStorage.getItem("user");
  let user = null;
  try {
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  return (
    <div>
      <p className={style.welcomeMessage}>Welcome, {user?.name || "User"}!</p>
      <button className={style.logoutButton} onClick={handleLogout} disabled={mutation.isLoading}>
        {mutation.isLoading ? <Loader size={16} /> : 'Logout'}
      </button>
    </div>
  );
}
export default UserMenu;
