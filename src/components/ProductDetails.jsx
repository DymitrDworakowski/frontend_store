import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/goods";
import Loader from "./Loader";
import Comments from "./Comments";
import CartAdd from "./CartAdd";
import AddComment from "./AddComment";
import style from "./ProductDetails.module.css";

function ProductDetails() {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const product = data;
  const token = localStorage.getItem("token");

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <Loader size={48} />
        <p className={style.loadingText}>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.errorContainer}>
        <h2 className={style.errorTitle}>Error</h2>
        <p className={style.errorMessage}>Failed to load product: {error.message}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={style.errorContainer}>
        <h2 className={style.errorTitle}>Product Not Found</h2>
        <p className={style.errorMessage}>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.productCard}>
        <div className={style.imageSection}>
          <img 
            src={product.image || "/logo192.png"} 
            alt={product.title}
            className={style.productImage}
          />
        </div>
        
        <div className={style.detailsSection}>
          <div className={style.header}>
            <h1 className={style.title}>{product.title} </h1>
            <div className={style.price}>${product.price}</div>
          </div>
          
          <div className={style.category}>
            {product.category}
          </div>
          
          <p className={style.description}>
            {product.description || "No description available."}
          </p>
          
          <div className={style.metaInfo}>
            <div className={style.stock}>
              <span className={style.stockLabel}>Availability:</span>
              <span className={`${style.stockValue} ${product.stock > 0 ? style.inStock : style.outOfStock}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
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
        </div>
      </div>

      <div className={style.commentsSection}>
        <div className={style.commentsHeader}>
          <h2 className={style.commentsTitle}>Customer Reviews</h2>
          {token && (
            <AddComment token={token} productId={product._id} />
          )}
        </div>
        <Comments token={token} productId={product._id} />
      </div>
    </div>
  );
}

export default ProductDetails;