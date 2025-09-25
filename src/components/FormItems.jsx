import { useMutation } from "@tanstack/react-query";
import { addItems } from "../api/admin";

function FormItems() {
  const mutation = useMutation({
    mutationFn: addItems,
    onSuccess: () => {
      console.log("Product added successfully");
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = {
      title: formData.get("title"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      category: formData.get("category"),
      barcode: formData.get("barcode"),
    };
    const token = localStorage.getItem("token");
    mutation.mutate({ token, itemData });
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Product Title" />
        <input type="number" name="price" placeholder="Price" />
        <input type="number" name="stock" placeholder="Stock" />
        <input type="text" name="category" placeholder="Category" />
        <input type="text" name="barcode" placeholder="Barcode" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
export default FormItems;

