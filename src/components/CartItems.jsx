import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/goods";

function CartAdd({ item ,token }) {
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
    mutation.mutate({ token, productId: item, quantity: 2 });
  };

  return (
    <div>
      <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
    </div>
  );
}
export default CartAdd;
