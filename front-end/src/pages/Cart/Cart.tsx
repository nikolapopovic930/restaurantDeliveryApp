import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ICart, { ICartProduct } from '../../models/ICart.model';
import './Cart.css';
import { useUser } from '../../context/UserContext';
import {
  getCart as getCartService,
  increaseItem as increaseCartItem,
  decreaseItem as decreaseCartItem,
  removeItem as removeCartItem,
} from '../../services/cartService';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const { user } = useUser();
  const [showButton, setShowButton] = useState(false);

  const getId = (product: ICartProduct) =>
    typeof product.productId === 'string' ? product.productId : product.productId._id!;

  const fetchCart = async () => {
    try {
      const cart = await getCartService(user?.token || '');
      setCart(cart.data?.data);
      if (typeof cart.totalPrice === 'number') setTotalPrice(cart.totalPrice);
    } catch (err) {
      console.error(err);
    }
  };

  const increaseItem = async (id: string) => {
    try {
      await increaseCartItem(id, user?.token || '');
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseItem = async (id: string) => {
    try {
      await decreaseCartItem(id, user?.token || '');
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeCartItem(id, user?.token || '');
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

  fetchCart();
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

            <span className="item-price">
              {product ? item.price?.toLocaleString('sr-RS') : '—'} RSD
            </span>

            <div className="item-qty">
              <button
                className="ctrl-btn"
                onClick={() => decreaseItem(id)}
                disabled={!item.quantity}
              >
                -
              </button>
              <span className="qty">{item.quantity}</span>
              <button className="ctrl-btn" onClick={() => increaseItem(id)}>
                +
              </button>
            </div>

            <button className="remove-btn" onClick={() => removeItem(id)}>
              x
            </button>
          </div>
        );
      })}
      <div className="total-price">
        Ukupna cena: {totalPrice.toLocaleString('sr-RS')} RSD
      </div>

      <button className="checkout-btn" onClick={() => navigate('/order')}>
        Poruči
      </button>
    </div>
  );
};

export default Cart;