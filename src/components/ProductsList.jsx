import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/goods";
import style from "./ProductsList.module.css";
import Pagination from "./Pagination";
import Loader from "./Loader";

function ProductsList({ filters, onPageChange }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (error)
    return <p>Error: {error instanceof Error ? error.message : String(error)}</p>;
  return (
    <div className={style.products}>
      <h2 className={style.title}>Products</h2>
      <ul className={style.list}>
        {data.products.map((product) => (
          <li key={product._id} className={style.item}>
            <p className={style.name}>Name: {product.title}</p>
            <img src={product.imageUrl} alt={product.title} />
            <p className={style.description}>
              Description: {!product.description ? "-" : product.description}
            </p>
            <p className={style.price}>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>On stock: {!product.stock ? "-" : product.stock}</p>
          </li>
        ))}
      </ul>
      <Pagination
        page={data.currentPage}
        totalPages={data.totalPages}
        onChange={(p) => onPageChange?.(p)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ProductsList;
