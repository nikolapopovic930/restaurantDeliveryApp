import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IProduct from '../../models/IProduct.model';
import ICart, { ICartProduct } from '../../models/ICart.model';
import './Cart.css';
import { useUser } from '../context/UserContext';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();
  const [showButton, setShowButton] = useState(false);   // modal state


  const getId = (p: ICartProduct) =>
    typeof p.productId === 'string' ? p.productId : p.productId._id!;

  /** ---------- HELPER FUNKCIJE ---------- */
  const inc = (id: string) =>
    setCart((c) =>
      c
        ? {
            ...c,
            products: c.products.map((p) =>
              getId(p) === id ? { ...p, quantity: p.quantity + 1 } : p
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
               getId(p) === id
                ? { ...p, quantity: Math.max(p.quantity - 1, 0) }
                : p
            ),
          }
        : c
    );

  const remove = (id: string) =>
    setCart((c) =>
      c ? { ...c, products: c.products.filter((p) => getId(p) !== id) } : c
    );

  /** ---------- FETCH PODACI ---------- */
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
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
            await fetch('http://localhost:3000/api/v1/carts/my-cart/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
          "Authorization": `Bearer ${user?.token}` }
      }),
            'cart'
          );
          setCart(c.data?.data);
        } catch (e) {
          console.error(e);
        }
      })();
  }, [user]);
  
 useEffect(() => {
    setShowButton(!!cart && cart.products.length > 0);
  }, [cart]);

  if (!cart || cart.products.length === 0) {


    return (
      <div className="cart-container">
        <h2>Vaša korpa je prazna</h2>
      </div>
    );
    }


  return (
    <div className="cart-container">
      {cart.products.map((item, idx) => {
        const id = getId(item);
        const product =
          typeof item.productId === 'string' ? null : (item.productId as any);
        return (
          <div key={id || idx} className="cart-item">
            {/* IMG + NAZIV */}
            <div className="item-info">
              {product && (
                <img
                  src={`/images${product.imagePath}`}
                  alt={product.name}
                  loading="lazy"
                />
              )}
              <span className="item-name">{product ? product.name : id}</span>
            </div>

            {/* CENA */}
            <span className="item-price">
              {product ? item.price?.toLocaleString('sr-RS') : '—'} RSD
            </span>

            {/* KOLIČINA */}
            <div className="item-qty">
              <button
                className="ctrl-btn"
                onClick={() => dec(id)}
                disabled={!item.quantity}
              >
                –
              </button>
              <span className="qty">{item.quantity}</span>
              <button className="ctrl-btn" onClick={() => inc(id)}>
                +
              </button>
            </div>

            {/* UKLONI */}
            <button className="remove-btn" onClick={() => remove(id)}>
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