import { userRegister } from "../api/admin";
import { useMutation } from "@tanstack/react-query";
import style from "./RegisterForm.module.css";
import Loader from './Loader';
import { toast } from 'react-toastify';

function RegisterForm() {
  const mutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      toast.success("Registration successful");
    },
    onError: (error) => {
      console.error("Registration error details:", error);
      toast.error(`Registration failed: ${error.message}`);
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
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>Create Account</h2>
      <p className={style.formDescription}>Join us today by creating your account</p>
      
      <form onSubmit={handleRegister} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="username" className={style.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className={style.input}
            required
            disabled={mutation.isLoading}
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="email" className={style.label}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={style.input}
            required
            disabled={mutation.isLoading}
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="password" className={style.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={style.input}
            required
            disabled={mutation.isLoading}
          />
        </div>

        <button 
          type="submit" 
          className={style.button}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <>
              <Loader size={16} />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;