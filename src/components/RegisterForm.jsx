import { userRegister } from "../api/admin";
import { useMutation } from "@tanstack/react-query";
import style from "./RegisterForm.module.css";

function RegisterForm() {
  const mutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      alert("Registration successful");
    },
    onError: (error) => {
      console.error("Registration error details:", error);
      alert(`Registration failed: ${error.message}`);
    },
  });

  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleRegister} className={style.form}>
      <div>
        <label htmlFor="username" className={style.label}>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className={style.input}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className={style.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className={style.input}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className={style.label}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className={style.input}
          required
        />
      </div>
      <button type="submit" className={style.button}>Register</button>
    </form>
  );
}

export default RegisterForm;
