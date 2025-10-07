import style from "./ProductsList.module.css";
import Pagination from "./Pagination";
import CartAdd from "./CartAdd";

import { NavLink } from "react-router-dom";

function ProductsList({ totalPages, onPageChange, pageToShow, items }) {
  const token = localStorage.getItem("token");

  return (
    <div className={style.products}>
      <h2 className={style.title}>Our Products</h2>
      <ul className={style.list}>
        {items.map((product) => (
          <li key={product._id} className={style.item}>
            <div className={style.imageContainer}>
              <img
                src={product.image || "/logo192.png"}
                alt={product.title}
                className={style.image}
              />
            </div>
            <div className={style.content}>
              <h3 className={style.name}>{product.title}</h3>
              <div className={style.details}>
                <p className={style.price}>${product.price}</p>
                <p className={style.category}>{product.category}</p>
                <p className={style.stock}>
                  {product.stock ? `${product.stock} in stock` : "Out of stock"}
                </p>
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
            <NavLink to={`/product/${product._id}`} className={style.link}>
              Show Details
            </NavLink>
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
