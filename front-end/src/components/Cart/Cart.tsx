import React, { useEffect, useState } from 'react';
import IProduct from '../../models/IProduct.model';
import ICart from '../../models/ICart.model';
import './Cart.css';

const CART_ID = '6838cbdac686d31a49dc81fd';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [products, setProducts] = useState<Record<string, IProduct>>({});

  useEffect(() => {
    const parse = async (r: Response, lbl: string) => {
      const txt = await r.text();
      if (!r.ok) throw new Error(`Failed to load ${lbl}: ${r.status} ${txt}`);
      try { return JSON.parse(txt); }
      catch { throw new Error(`${lbl} returned invalid JSON: ${txt.slice(0,100)}`); }
    };

    (async () => {
      try {
        const c = await parse(await fetch(`http://localhost:3000/api/v1/carts/${CART_ID}`), 'cart');
        setCart(c.data?.data);

        const prod = await parse(await fetch('http://localhost:3000/api/v1/products'), 'products');
        const map: Record<string, IProduct> = {};
        for (const p of prod.data?.data || []) map[p._id!] = p;
        setProducts(map);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!cart) return <div className="cart-container">Učitavanje...</div>;

  return (
    <div className="cart-container">
      {cart.products.map((item, idx) => {
        const product = products[item.productId];
        return (
          <div key={idx} className="cart-item">
            {product && <img src={`/images${product.imagePath}`} alt={product.name} />}
            <div className="cart-details">
              <h3>{product ? product.name : item.productId}</h3>
              <p>Količina: {item.quantity}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;