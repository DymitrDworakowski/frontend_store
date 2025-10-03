import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../api/admin";
import { useNavigate } from "react-router-dom";
import style from "./LoginForm.module.css";
import Loader from "./Loader";

function LoginForm() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      // notify same-window listeners about token presence
      try {
        window.dispatchEvent(new CustomEvent('authChange', { detail: { user: data.user ?? null, token: data.token } }));
      } catch {}
      alert("Login successful");
      navigate("/");
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
  };

  return (
      <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.formGroup}>
        <label htmlFor="username" className={style.label}>Username:</label>
        <input
        
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
          className={style.input}
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="email" className={style.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className={style.input}
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="password" className={style.label}>Password:</label>
        <input

          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          className={style.input}
        
        />
      </div>
  <button type="submit" className={style.button}>{mutation.isLoading ? <Loader size={16} /> : 'Login'}</button>
    </form>
  );
}

export default LoginForm;
