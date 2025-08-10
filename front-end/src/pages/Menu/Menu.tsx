import React, { useEffect, useState } from 'react';
import IProduct from '../../models/IProduct.model';
import './Menu.css';
import { useUser } from '../../context/UserContext';
import Modal from '../../components/Modal/Modal';
import { getCategoriesWithProducts } from '../../services/categoryService';
import { addItem } from '../../services/cartService';
import ICategory from '../../models/ICategory.model';

interface ICategoryWithProducts extends ICategory {
  products: IProduct[];
}

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<ICategoryWithProducts[]>([]);
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const res = await getCategoriesWithProducts();
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

    const increment = (id: string) => {
      setQuantity((prevQuantity) => {
    const current = prevQuantity[id] ?? 0;
    const updated = current + 1;
    return {
      ...prevQuantity,
      [id]: updated,
    };
  });
};

  const decrement = (id: string) => {
  setQuantity((prevQuantity) => {
    const current = prevQuantity[id] ?? 0;
    const updated = Math.max(current - 1, 0);
    return {
      ...prevQuantity,
      [id]: updated,
    };
  });
};

  const handleAdd = async (id: string) => {
    const amount = quantity[id] || 0;
    if (amount <= 0) return;

      if (!user) {
        setModalTitle('Greška');
        setModalMessage('Morate se ulogovati da bi dodavali proizvode u korpu');
        setModalOpen(true);
        return;
    }

    try {
      await addItem(id, amount, user?.token || '');
      setQuantity((quantity) => ({ ...quantity, [id]: 0 }));
      setModalTitle('Uspešno ste dodali proizvod u korpu');
      setModalMessage('');
      setModalOpen(true);
      return;
    } catch (err) {
      alert('Došlo je do greške prilikom dodavanja u korpu');
    }
  };

  const handleClose = () => setModalOpen(false);

  return (
    <>
    <div className="menu-container">
      {categories.map((category) => (
        <div key={category._id} className="menu-category">
          <h2>{category.name}</h2>

          <div className="menu-items">
            {category.products.map((p) => (
              <div key={p._id} className="menu-item">
                <img src={`images${p.imagePath}`} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="price">{p.price} RSD</span>

                <div className="cart-controls">
                  <button
                    className="ctrl-btn"
                    onClick={() => decrement(p._id!)}
                    disabled={!quantity[p._id!]}
                  >
                    -
                  </button>

                  <span className="qty">{quantity[p._id!] || 0}</span>

                  <button className="ctrl-btn" onClick={() => increment(p._id!)}>
                    +
                  </button>

                  <button
                    className="add-btn"
                    onClick={() => handleAdd(p._id!)}
                    disabled={!quantity[p._id!]}
                  >
                    Dodaj
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <Modal
      isOpen={modalOpen}
      title={modalTitle}
      message={modalMessage}
      onClose={handleClose}
    />
    </>
  );
};

export default Menu;


