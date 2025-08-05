import React, { useEffect, useState } from 'react';
import IProduct from '../../models/IProduct.model';
import ICategories from '../../models/ICategories.model';
import './Menu.css';
import { useUser } from '../../components/context/UserContext';
import Modal from '../../components/Modal/Modal';


interface ICategoryWithProducts extends ICategories {
  products: IProduct[];
}

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<ICategoryWithProducts[]>([]);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const parse = async (res: Response, label: string) => {
      const txt = await res.text();
      if (!res.ok) throw new Error(`Failed to load ${label}: ${res.status} ${txt}`);
      try { return JSON.parse(txt); }
      catch { throw new Error(`${label} returned invalid JSON: ${txt.slice(0, 100)}`); }
    };

    (async () => {
      try {
        const res = await parse(
          await fetch('http://localhost:3000/api/v1/categories/products'),
          'categoriesWithProducts'
        );
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const inc = (id: string) =>
    setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 }));

  const dec = (id: string) =>
    setQty((q) => ({ ...q, [id]: Math.max((q[id] || 0) - 1, 0) }));

  const handleAdd = async (id: string) => {
    const amount = qty[id] || 0;
    if (amount <= 0) return;

      if (!user) {
        setModalTitle('Greška');
        setModalMessage('Morate se ulogovati da bi dodavali proizvode u korpu');
        setModalOpen(true);
        return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/carts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: amount,
        }),
      });

      setQty((q) => ({ ...q, [id]: 0 }));
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
      {categories.map((c) => (
        <div key={c._id} className="menu-category">
          <h2>{c.name}</h2>

          <div className="menu-items">
            {c.products.map((p) => (
              <div key={p._id} className="menu-item">
                <img src={`images${p.imagePath}`} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="price">{p.price} RSD</span>

                <div className="cart-controls">
                  <button
                    className="ctrl-btn"
                    onClick={() => dec(p._id!)}
                    disabled={!qty[p._id!]}
                  >
                    -
                  </button>

                  <span className="qty">{qty[p._id!] || 0}</span>

                  <button className="ctrl-btn" onClick={() => inc(p._id!)}>
                    +
                  </button>

                  <button
                    className="add-btn"
                    onClick={() => handleAdd(p._id!)}
                    disabled={!qty[p._id!]}
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


