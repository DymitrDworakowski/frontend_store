import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/goods";
import style from "./ProductsList.module.css";

function ProductsList({ filters }) {
  

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters], 
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={style.products}>
      <h2 className={style.title}>Products</h2>
      <ul className={style.list}>
        {data.products.map((product) => (
          <li key={product._id} className={style.item}>
            <p className={style.name}>Name: {product.title}</p>
            <p className={style.price}>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>On stock: {!product.stock ? "-" : product.stock}</p>
          </li>
        ))}
      </ul>
      <p>
        Page {data.currentPage} of {data.totalPages}
      </p>
    </div>
  );
}

export default ProductsList;

