import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/goods";

function Products() {
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
    </div>
  );
}

export default Products;
