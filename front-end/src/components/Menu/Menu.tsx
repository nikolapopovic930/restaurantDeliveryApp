import React, { useEffect, useState } from 'react';
import IProduct from '../../models/IProduct.model';
import ICategories from '../../models/ICategories.model';
import './Menu.css';

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [products, setProducts]     = useState<IProduct[]>([]);
  const [qty, setQty] = useState<Record<string, number>>({}); // količine po _id‑u

  // ------------------------------------------------------------------
  // FETCH podataka
  // ------------------------------------------------------------------
  useEffect(() => {
    const parse = async (r: Response, lbl: string) => {
      const txt = await r.text();
      if (!r.ok) throw new Error(`Failed to load ${lbl}: ${r.status} ${txt}`);
      try { return JSON.parse(txt); }
      catch { throw new Error(`${lbl} returned invalid JSON: ${txt.slice(0,100)}`); }
    };

    (async () => {
      try {
        const cat = await parse(await fetch('http://localhost:3000/api/v1/categories'), 'categories');
        setCategories(cat.data?.data || []);

        const prod = await parse(await fetch('http://localhost:3000/api/v1/products'), 'products');
        setProducts(prod.data?.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // ------------------------------------------------------------------
  // HELPERI
  // ------------------------------------------------------------------
  const byCategory = (id: string) =>
    products.filter((p) =>
      typeof p.category === 'string'
        ? p.category === id
        : (p.category as ICategories)?._id === id
    );

  const inc = (id: string) => setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 }));
  const dec = (id: string) => setQty((q) => ({ ...q, [id]: Math.max((q[id] || 0) - 1, 0) }));

  const handleAdd = (id: string) => {
    const amount = qty[id] || 0;
    console.log(`Dodajem ${amount} kom. proizvoda ${id} u korpu`);
    // TODO: dispatch / service call
  };

  // ------------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------------
  return (
    <div className="menu-container">
      {categories.map((c) => (
        <div key={c._id} className="menu-category">
          <h2>{c.name}</h2>

          <div className="menu-items">
            {byCategory(c._id!).map((p) => (
              <div key={p._id} className="menu-item">
                <img src={`images${p.imagePath}`} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="price">{p.price} RSD</span>

                {/* -------- kontrole -------- */}
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
  );
};

export default Menu;


