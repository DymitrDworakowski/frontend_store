import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/goods";
import { useState } from "react";
import style from "./CartAdd.module.css";
import Loader from "./Loader";
import { ReactComponent as MinusIcon } from "../assets/svg/minus.svg";
import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";
import { ReactComponent as CartIcon } from "../assets/svg/cart.svg";
import { toast } from 'react-toastify';

function CartAdd({ item, token, stock }) {
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Item added to cart successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add item to cart: ${error.message}`);
    },
  });

  const handleAddToCart = () => {
    mutation.mutate({ token, productId: item, quantity });
  };

  const handleDecrement = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev < stock ? prev + 1 : stock);
  };

  return (
    <div className={style.cartAdd}>
      <div className={style.quantitySelector}>
        <span className={style.quantityLabel}>Quantity:</span>
        <div className={style.quantityControls}>
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className={style.quantityButton}
            aria-label="Decrease quantity"
          >
            <MinusIcon width={16} height={16} />
          </button>
          
          <span className={style.quantityDisplay}>{quantity}</span>
          
          <button
            onClick={handleIncrement}
            disabled={quantity >= stock}
            className={style.quantityButton}
            aria-label="Increase quantity"
          >
            <PlusIcon width={16} height={16} />
          </button>
        </div>
        
        {stock > 0 && (
          <span className={style.stockInfo}>
            {stock} available
          </span>
        )}
      </div>

      <button 
        onClick={handleAddToCart}
        disabled={mutation.isLoading || stock === 0}
        className={style.addButton}
      >
        {mutation.isLoading ? (
          <>
            <Loader size={16} />
            Adding...
          </>
        ) : (
          <>
            <CartIcon width={18} height={18} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

export default CartAdd;