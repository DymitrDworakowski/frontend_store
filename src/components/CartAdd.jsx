import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/goods";
import { useState } from "react";

function CartAdd({ item, token, stock }) {
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      alert("Item added to cart");
    },
    onError: (error) => {
      alert(`Failed to add item to cart: ${error.message}`);
    },
  });

  const handleAddToCart = (item) => {
    mutation.mutate({ token, productId: item, quantity });
  };

  return (
    <div>
      <button
        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <button
        onClick={() => setQuantity(quantity < stock ? quantity + 1 : stock)}
        disabled={quantity >= stock}
      >
        +
      </button>

      <br />
      <span> Cart: </span>
      <span> {quantity} </span>
      <br />
      <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
    </div>
  );
}
export default CartAdd;
