import React, { useState } from 'react';

export default function ProductCard({ product, onDelete, onEdit }) {
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState(product);
  const [saving, setSaving] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onEdit(form); // parent handles API
      setEditable(false);
    } catch (err) {
      alert('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${product.name}"?`);
    if (confirmDelete) {
      onDelete(product.id);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
      {editable ? (
        <>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
            placeholder="Price"
          />
          <button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
        </>
      )}

      <button
        onClick={() => {
          setEditable(!editable);
          setForm(product); // Reset on cancel
        }}
      >
        {editable ? 'Cancel' : 'Edit'}
      </button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
