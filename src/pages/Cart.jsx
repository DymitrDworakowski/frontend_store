import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api/goods";

function Cart() {
  const token = localStorage.getItem("token");

  const {
    data: cartItems,
    isLoading,
    error,
  } = useQuery({
    // include token in the key so cache is per-user
    queryKey: ["cart", token],
    // pass the token string directly to the API helper
    queryFn: () => getCartItems(token),
    // don't run the query when there's no token
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <p>
        Loading...{" "}
        <span role="img" aria-label="loading">
          ⏳
        </span>
      </p>
    );
  }

  if (error) {
    return <p>Error fetching cart items: {error.message}</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <p> Title : {item.product.title} </p> - Quantity: {item.quantity}
            </li>
          ))}
          <p>
            Total Quantity:{" "}
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </p>
          <p>
            Total Price:{" "}
            {cartItems.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )}
          </p>
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
