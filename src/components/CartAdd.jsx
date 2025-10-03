import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/goods";
import { useState } from "react";
import style from "./CartAdd.module.css";
import Loader from "./Loader";

function CartAdd({ item, token, stock }) {
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      alert("Item added to cart successfully!");
    },
    onError: (error) => {
      alert(`Failed to add item to cart: ${error.message}`);
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
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <span className={style.quantityDisplay}>{quantity}</span>
          
          <button
            onClick={handleIncrement}
            disabled={quantity >= stock}
            className={style.quantityButton}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="8" cy="21" r="1" strokeWidth="2"/>
              <circle cx="19" cy="21" r="1" strokeWidth="2"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" strokeWidth="2"/>
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

export default CartAdd;