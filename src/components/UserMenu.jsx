import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/admin";
import style from "./UserMenu.module.css";
import Loader from "./Loader";
import { ReactComponent as AvatarIcon } from "../assets/svg/avatar.svg";
import { ReactComponent as CartIcon } from "../assets/svg/cart.svg";
import { ReactComponent as LogoutIcon } from "../assets/svg/logout.svg";

function UserMenu() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      try {
        window.dispatchEvent(
          new CustomEvent("authChange", { detail: { user: null, token: null } })
        );
      } catch {}
      queryClient.invalidateQueries(["adminProducts"]);
      setTimeout(() => {
        try {
          window.location.reload();
        } catch (e) {
          // fallback: navigate to root
          window.location.href = "/";
        }
      }, 100);
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
          <AvatarIcon width={32} height={32} />
        </div>
        <div className={style.userDetails}>
          <p className={style.welcomeMessage}>Welcome back</p>
          <p className={style.userName}>{user?.name || "User"}</p>
        </div>
      </div>

      <div className={style.actions}>
        <a href="/cart" className={style.cartLink}>
          <CartIcon width={18} height={18} />
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
              <LogoutIcon width={18} height={18} />
              Logout
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
