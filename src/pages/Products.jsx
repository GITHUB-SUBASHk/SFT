import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/products', form);
    setForm({ name: '', description: '', price: '' });
    fetchProducts();
  };

  const handleDelete = async id => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleEdit = async product => {
    await API.put(`/products/${product.id}`, product);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} value={form.price} required />
        <button type="submit">Add Product</button>
      </form>

      <div>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}
