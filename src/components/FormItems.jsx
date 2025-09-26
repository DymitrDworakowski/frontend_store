import { useMutation } from "@tanstack/react-query";
import { addItems, editItem } from "../api/admin";
import style from './FormItems.module.css';
import Loader from './Loader';

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
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="title">Product Title</label>
          <input 
            className={style.input} 
            id="title"
            defaultValue={initialData.title || ''} 
            type="text" 
            name="title" 
            placeholder="Enter product title" 
            required 
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="price">Price</label>
          <input 
            className={style.input} 
            id="price"
            defaultValue={initialData.price ?? ''} 
            type="number" 
            name="price" 
            placeholder="Enter price" 
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="stock">Stock</label>
          <input 
            className={style.input} 
            id="stock"
            defaultValue={initialData.stock ?? ''} 
            type="number" 
            name="stock" 
            placeholder="Enter stock quantity" 
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="category">Category</label>
          <input 
            className={style.input} 
            id="category"
            defaultValue={initialData.category || ''} 
            type="text" 
            name="category" 
            placeholder="Enter category" 
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="barcode">Barcode</label>
          <input 
            className={style.input} 
            id="barcode"
            defaultValue={initialData.barcode || ''} 
            type="text" 
            name="barcode" 
            placeholder="Enter barcode" 
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="imageUrl">Image URL</label>
          <input 
            className={style.input} 
            id="imageUrl"
            defaultValue={initialData.imageUrl || ''} 
            type="text" 
            name="imageUrl" 
            placeholder="Enter image URL" 
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="description">Description</label>
          <textarea 
            className={style.textarea} 
            id="description"
            defaultValue={initialData.description || ''} 
            name="description" 
            placeholder="Enter product description" 
            rows={4}
          />
        </div>

        <button className={style.button} type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? <Loader size={16} /> : (mode === 'edit' ? 'Save Changes' : 'Add Product')}
        </button>
      </form>
    </div>
  );
}

export default FormItems;