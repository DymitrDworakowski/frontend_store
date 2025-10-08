import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api/goods";
import { removeFromCart } from "../api/goods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import style from "./Cart.module.css";
import { ReactComponent as PlaceholderIcon } from "../assets/svg/placeholder.svg";
import { ReactComponent as TrashIcon } from "../assets/svg/trash.svg";

function Cart() {
  const token = localStorage.getItem("token");

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => getCartItems(token),
    enabled: !!token,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", token]);
    },
  });

  const handleRemoveFromCart = (productId) => {
    mutation.mutate({ token, productId });
  };

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <Loader size={32} />
        <p className={style.loadingText}>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.errorContainer}>
        <h2 className={style.errorTitle}>Error</h2>
        <p className={style.errorMessage}>
          Failed to load cart: {error.message}
        </p>
      </div>
    );
  }

  const totalQuantity =
    cartItems?.reduce((acc, item) => acc + (item?.quantity ?? 0), 0) ?? 0;
  const totalPrice =
    cartItems?.reduce(
      (acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 0),
      0
    ) ?? 0;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Your Shopping Cart</h2>
        {cartItems && cartItems.length > 0 && (
          <span className={style.itemCount}>
            {totalQuantity} item{totalQuantity !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className={style.cartContent}>
          <div className={style.itemsList}>
            {cartItems.map((item) => (
              <div
                key={item._id ?? item.product?._id ?? item.productId}
                className={style.cartItem}
              >
                <div className={style.itemImage}>
                  {item.product?.image ? (
                    <img
                      src={item.product?.image}
                      alt={item.product?.title || "Product image"}
                      className={style.image}
                    />
                  ) : (
                    <div className={style.imagePlaceholder}>
                      <PlaceholderIcon width={40} height={40} />
                    </div>
                  )}
                </div>

                <div className={style.itemDetails}>
                  <h3 className={style.productTitle}>
                    {item.product?.title || "No Title"}
                  </h3>
                  <p className={style.productCategory}>
                    {item.product?.category || "—"}
                  </p>
                  <div className={style.priceQuantity}>
                    <span className={style.price}>
                      {typeof item?.product?.price === "number"
                        ? `$${item.product.price}`
                        : "—"}
                    </span>
                    <span className={style.quantity}>
                      Qty: {item?.quantity ?? 0}
                    </span>
                  </div>
                  <p className={style.itemTotal}>
                    Total:{" "}
                    <strong>
                      $
                      {(
                        (item?.product?.price ?? 0) * (item?.quantity ?? 0)
                      ).toFixed(2)}
                    </strong>
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleRemoveFromCart(
                      item.product?._id ?? item.productId ?? item._id
                    )
                  }
                  className={style.removeButton}
                  disabled={mutation.isLoading}
                  aria-label="Remove from cart"
                >
                  {mutation.isLoading ? (
                    <Loader size={16} />
                  ) : (
                    <TrashIcon width={18} height={18} />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className={style.cartSummary}>
            <div className={style.summaryRow}>
              <span>Total Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className={style.summaryRow}>
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={style.summaryRow}>
              <span>Shipping:</span>
              <span>{totalPrice > 100 ? "Free" : "$5.99"}</span>
            </div>
            <div className={style.summaryDivider}></div>
            <div className={`${style.summaryRow} ${style.total}`}>
              <span>Total Amount:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className={style.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={style.emptyCart}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={style.emptyCartIcon}
          >
            <circle cx="8" cy="21" r="1" strokeWidth="2" />
            <circle cx="19" cy="21" r="1" strokeWidth="2" />
            <path
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
              strokeWidth="2"
            />
          </svg>
          <h3 className={style.emptyCartTitle}>Your cart is empty</h3>
          <p className={style.emptyCartText}>
            Add some products to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
