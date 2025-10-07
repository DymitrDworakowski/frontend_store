function ProductDetails({ product }) {
  console.log(product)
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h3>Product Details</h3>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

export default ProductDetails;
