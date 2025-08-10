const API_URL =process.env.REACT_APP_API_URL;

export const getCart = async (token: string) => {
  const res = await fetch(`${API_URL}/carts/my-cart/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to load cart');
  return res.json();
};

export const increaseItem = async (productId: string, token: string) => {
  const res = await fetch(`${API_URL}/carts/increase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error('Failed to increase item');
  return res;
};

export const decreaseItem = async (productId: string, token: string) => {
  const res = await fetch(`${API_URL}/carts/decrease`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error('Failed to decrease item');
  return res;
};

export const removeItem = async (productId: string, token: string) => {
  const res = await fetch(`${API_URL}/carts/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error('Failed to remove item');
  return res;
};

export const addItem = async (productId: string, quantity: number, token: string) => {
  const res = await fetch(`${API_URL}/carts/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return res;
};