import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/goods";
import style from "./ProductsList.module.css";
import Pagination from "./Pagination";
import CartAdd from "./CartAdd";
import Loader from "./Loader";
import AddComment from "./AddComment";
import Comments from "./Comments";

function ProductsList({ filters, onPageChange }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className={style.products}>
        <Loader />
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
      <h2 className={style.title}>Our Products</h2>
      <ul className={style.list}>
        {items.map((product) => (
          <li key={product._id} className={style.item}>
            <div className={style.imageContainer}>
              <img
                src={product.imageUrl || "/logo192.png"}
                alt={product.title}
                className={style.image}
              />
            </div>
            <div className={style.content}>
              <h3 className={style.name}>{product.title}</h3>
              <p className={style.description}>
                {!product.description
                  ? "No description available"
                  : product.description}
              </p>
              <div className={style.details}>
                <p className={style.price}>${product.price}</p>
                <p className={style.category}>{product.category}</p>
                <p className={style.stock}>
                  {product.stock ? `${product.stock} in stock` : "Out of stock"}
                </p>
              </div>
              <div>
                {token && <AddComment token={token} product={product._id} />}
              </div>
              {token && (
                <div className={style.cartAction}>
                  <CartAdd
                    token={token}
                    item={product._id}
                    stock={product.stock}
                  />
                </div>
              )}
            </div>
            <button>Show Comments</button>
            <Comments token={token} productId={product._id} />
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
