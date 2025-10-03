import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/admin";
import style from "./UserMenu.module.css";
import Loader from "./Loader";

function UserMenu() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      try {
        window.dispatchEvent(new CustomEvent('authChange', { detail: { user: null, token: null } }));
      } catch {}
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
    <div className={style.userMenu}>
      <div className={style.userInfo}>
        <div className={style.avatar}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="7" r="4" strokeWidth="2"/>
          </svg>
        </div>
        <div className={style.userDetails}>
          <p className={style.welcomeMessage}>Welcome back</p>
          <p className={style.userName}>{user?.name || "User"}</p>
        </div>
      </div>
      
      <div className={style.actions}>
        <a href="/cart" className={style.cartLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="8" cy="21" r="1" strokeWidth="2"/>
            <circle cx="19" cy="21" r="1" strokeWidth="2"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" strokeWidth="2"/>
          </svg>
          Cart
        </a>
        
        <button
          className={style.logoutButton}
          onClick={handleLogout}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <>
              <Loader size={16} />
              Logging out...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" strokeLinecap="round"/>
                <path d="m16 17 5-5-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Logout
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default UserMenu;