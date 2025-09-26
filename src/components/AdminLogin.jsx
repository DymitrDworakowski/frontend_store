import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../api/admin";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import style from "./LoginForm.module.css";

function AdminLogin() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/admin/panel"); // Переносимо навігацію сюди після успішного логіну
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
    // Видаляємо navigate звідси - він буде викликаний в onSuccess
  };

  if (mutation.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader center />
      </div>
    );
  }

  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>Admin Login</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="username" className={style.label}>
            Admin Name:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your admin name"
            required
            className={style.input}
            disabled={mutation.isLoading}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="email" className={style.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className={style.input}
            disabled={mutation.isLoading}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="password" className={style.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className={style.input}
            disabled={mutation.isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={style.button}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
        
        {mutation.isError && (
          <div className={style.error}>
            Login failed: {mutation.error.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default AdminLogin;