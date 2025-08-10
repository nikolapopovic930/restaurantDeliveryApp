const API_URL = process.env.REACT_APP_API_URL;

export interface DeliveryInfo {
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  note?: string;
}

export const placeOrder = async (deliveryInfo: DeliveryInfo, token: string) => {
  const res = await fetch(`${API_URL}/orders/placeOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deliveryInfo }),
  });
  if (!res.ok) throw new Error('Failed to place order');
  return res;
};