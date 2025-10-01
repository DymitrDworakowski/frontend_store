import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/goods";
import style from "./ProductsList.module.css";
import Pagination from "./Pagination";
import CartAdd from "./CartAdd";
import Loader from "./Loader";

function ProductsList({ filters, onPageChange }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className={style.products}>
        <Loader center />
      </div>
    );
  if (error)
    return (
      <p>Error: {error instanceof Error ? error.message : String(error)}</p>
    );

  // defensive data shape handling
  const items = Array.isArray(data?.products) ? data.products : [];
  const serverPage = Number(data?.currentPage || data?.page || 0) || 0;
  const clientPage = Number(filters?.page || 0) || 0;
  const pageToShow = clientPage || serverPage || 1;
  const totalPages =
    Number(
      data?.totalPages ||
        data?.pages ||
        Math.ceil((data?.total || items.length) / (filters?.limit || 1))
    ) || 1;

  const token = localStorage.getItem("token");

  return (
    <div className={style.products}>
      <h2 className={style.title}>Products</h2>
      <ul className={style.list}>
        {items.map((product) => (
          <li key={product._id} className={style.item}>
            <p className={style.name}>Name: {product.title}</p>
            <img src={product.imageUrl || "/logo192.png"} alt={product.title} />
            <p className={style.description}>
              Description: {!product.description ? "-" : product.description}
            </p>
            <p className={style.price}>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>On stock: {!product.stock ? "-" : product.stock}</p>
            <div></div>
            {token ? (
              <CartAdd token={token} item={product._id} stock={product.stock} />
            ) : null}
          </li>
        ))}
      </ul>
      <Pagination
        page={pageToShow}
        totalPages={totalPages}
        onChange={(p) => onPageChange?.(p)}
      />
    </div>
  );
}

export default ProductsList;
