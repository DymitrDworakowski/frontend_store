import {userRegister} from "../api/admin";
import { useMutation } from "@tanstack/react-query";

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
    <form onSubmit={handleRegister}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
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
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
