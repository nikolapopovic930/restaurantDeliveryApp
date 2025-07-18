import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IProduct from '../../models/IProduct.model';
import ICart from '../../models/ICart.model';
import './Cart.css';

const CART_ID = '6838cbdac686d31a49dc81fd';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [products, setProducts] = useState<Record<string, IProduct>>({});
  const navigate = useNavigate();

  /** ---------- HELPER FUNKCIJE ---------- */
  const inc = (id: string) =>
    setCart((c) =>
      c
        ? {
            ...c,
            products: c.products.map((p) =>
              p.productId === id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          }
        : c
    );

  const dec = (id: string) =>
    setCart((c) =>
      c
        ? {
            ...c,
            products: c.products.map((p) =>
              p.productId === id
                ? { ...p, quantity: Math.max(p.quantity - 1, 0) }
                : p
            ),
          }
        : c
    );

  const remove = (id: string) =>
    setCart((c) =>
      c ? { ...c, products: c.products.filter((p) => p.productId !== id) } : c
    );

  /** ---------- FETCH PODACI ---------- */
  useEffect(() => {
    const parse = async (r: Response, lbl: string) => {
      const txt = await r.text();
      if (!r.ok) throw new Error(`Failed to load ${lbl}: ${r.status} ${txt}`);
      try {
        return JSON.parse(txt);
      } catch {
        throw new Error(`${lbl} returned invalid JSON: ${txt.slice(0, 100)}`);
      }
    };

    (async () => {
      try {
        const c = await parse(
          await fetch(`http://localhost:3000/api/v1/carts/${CART_ID}`),
          'cart'
        );
        setCart(c.data?.data);

        const prod = await parse(
          await fetch('http://localhost:3000/api/v1/products'),
          'products'
        );
        const map: Record<string, IProduct> = {};
        for (const p of prod.data?.data || []) map[p._id!] = p;
        setProducts(map);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  /** ---------- PRIKAZ ---------- */
  if (!cart) return <div className="cart-container">Učitavanje...</div>;

  return (
    <div className="cart-container">
      {cart.products.map((item, idx) => {
        const product = products[item.productId];
        return (
          <div key={idx} className="cart-item">
            {/* IMG + NAZIV */}
            <div className="item-info">
              {product && (
                <img
                  src={`/images${product.imagePath}`}
                  alt={product.name}
                  loading="lazy"
                />
              )}
              <span className="item-name">
                {product ? product.name : item.productId}
              </span>
            </div>

            {/* CENA */}
            <span className="item-price">
              {product ? product.price.toLocaleString('sr-RS') : '—'} RSD
            </span>

            {/* KOLIČINA */}
            <div className="item-qty">
              <button
                className="ctrl-btn"
                onClick={() => dec(item.productId)}
                disabled={!item.quantity}
              >
                –
              </button>
              <span className="qty">{item.quantity}</span>
              <button className="ctrl-btn" onClick={() => inc(item.productId)}>
                +
              </button>
            </div>

            {/* UKLONI */}
            <button className="remove-btn" onClick={() => remove(item.productId)}>
              ×
            </button>
          </div>
        );
      })}

      <button className="checkout-btn" onClick={() => navigate('/order')}>
        Poruči
      </button>
    </div>
  );
};

export default Cart;