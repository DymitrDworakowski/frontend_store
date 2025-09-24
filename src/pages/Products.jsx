import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/goods";
import style from './Products.module.css';

function Products() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
    </div>
  );
}

export default Products;
