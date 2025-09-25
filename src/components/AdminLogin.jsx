import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../api/admin";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      alert("Login successful");
    },
    onError: (error) => {
      alert(`Login failed: ${error.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const credentials = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    mutation.mutate(credentials);
    navigate("/admin/panel");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Admin name:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your admin name"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit">
        {mutation.isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default AdminLogin;
