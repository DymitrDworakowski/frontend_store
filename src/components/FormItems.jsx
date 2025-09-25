import { useMutation } from "@tanstack/react-query";
import { addItems, editItem } from "../api/admin";
import style from './FormItems.module.css';

// Props:
// - initialData (optional) { title, price, stock, category, barcode }
// - mode: 'add' | 'edit' (default 'add')
// - itemId (required for edit mode)
// - onSuccess (optional) callback
function FormItems({ initialData = {}, mode = 'add', itemId, onSuccess }) {
  const mutation = useMutation({
    mutationFn: (payload) => {
      if (mode === 'edit') return editItem(payload);
      return addItems(payload);
    },
    onSuccess: (data) => {
      console.log(mode === 'edit' ? 'Product edited successfully' : 'Product added successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('Error adding/editing product:', error);
      alert(`Operation failed: ${error?.message || String(error)}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = {
      title: formData.get('title'),
      price: Number(formData.get('price')) || 0,
      stock: Number(formData.get('stock')) || 0,
      category: formData.get('category'),
      barcode: formData.get('barcode'),
      description: formData.get('description') || '',
      imageUrl: formData.get('imageUrl') || '',
    };
    const token = localStorage.getItem('token');
    if (mode === 'edit') {
      if (!itemId) return alert('Missing item id for edit');
      mutation.mutate({ token, itemId, itemData });
    } else {
      mutation.mutate({ token, itemData });
    }
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>{mode === 'edit' ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <input className={style.input} defaultValue={initialData.title || ''} type="text" name="title" placeholder="Product Title" required />
        <input className={style.input} defaultValue={initialData.price ?? ''} type="number" name="price" placeholder="Price" />
        <input className={style.input} defaultValue={initialData.stock ?? ''} type="number" name="stock" placeholder="Stock" />
        <input className={style.input} defaultValue={initialData.category || ''} type="text" name="category" placeholder="Category" />
        <input className={style.input} defaultValue={initialData.barcode || ''} type="text" name="barcode" placeholder="Barcode" />
        <input className={style.input} defaultValue={initialData.imageUrl || ''} type="text" name="imageUrl" placeholder="Image URL" />
        <textarea className={style.textarea} defaultValue={initialData.description || ''} name="description" placeholder="Description" />
        <button className={style.button} type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? (mode === 'edit' ? 'Saving...' : 'Adding...') : (mode === 'edit' ? 'Save' : 'Add Product')}
        </button>
      </form>
    </div>
  );
}
export default FormItems;
