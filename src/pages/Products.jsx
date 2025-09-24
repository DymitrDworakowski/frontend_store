import { useQuery, useMutation } from "@tanstack/react-query";
import { getProducts } from "../api/goods";
import { logout } from "../api/admin";

function Products() {
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

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.products.map((product) => (
          <li key={product._id}>
            {product.title}
            <p>price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>On stock: {!product.stock ? "-" : product.stock}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Products;
