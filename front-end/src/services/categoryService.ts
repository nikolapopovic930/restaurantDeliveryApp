const API_URL = process.env.REACT_APP_API_URL

export const getCategoriesWithProducts = async () => {
  const res = await fetch(`${API_URL}/categories/products`);
  if (!res.ok) throw new Error('Failed to load categories with products');
  return res.json();
};