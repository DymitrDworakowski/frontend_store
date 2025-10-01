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
      <input
        type="text"
        min={1}
        max={stock}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
    </div>
  );
}
export default CartAdd;
