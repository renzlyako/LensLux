import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import new1 from '../../assets/new1.png';
import new2 from '../../assets/new2.png';
import new3 from '../../assets/new3.png';
import new4 from '../../assets/new4.png';
import new5 from '../../assets/new5.png';
import new6 from '../../assets/new6.png';
import new7 from '../../assets/new7.png';
import new8 from '../../assets/new8.png';
import new9 from '../../assets/new9.png';
import './NewArrivals.css';

const VISIBLE = 4;

const arrivals = [
  { id: 1, img: new1, badge: 'New',       name: 'Riviera Classic',   color: 'Midnight Black', price: 129 },
  { id: 2, img: new2, badge: 'New Color', name: 'Monaco Slim',       color: 'Sand Dune',      price: 149 },
  { id: 3, img: new3, badge: 'New',       name: 'Capri Sport',       color: 'Ocean Teal',     price: 189 },
  { id: 4, img: new4, badge: 'New Color', name: 'Santorini Oval',    color: 'Rose Gold',      price: 159 },
  { id: 5, img: new5, badge: 'New',       name: 'Ibiza Retro',       color: 'Tortoise Brown', price: 139 },
  { id: 6, img: new6, badge: 'New Color', name: 'Cannes Cat-Eye',    color: 'Pearl White',    price: 169 },
  { id: 7, img: new7, badge: 'New',       name: 'Malibu Wraparound', color: 'Smoke Grey',     price: 199 },
  { id: 8, img: new8, badge: 'New Color', name: 'Amalfi Round',      color: 'Olive Green',    price: 119 },
  { id: 9, img: new9, badge: 'New',       name: 'Biarritz Aviator',  color: 'Gold Chrome',    price: 179 },
];

const looped = [...arrivals, ...arrivals.slice(0, VISIBLE)];

const NewArrivals = () => {
  const [index, setIndex]       = useState(0);
  const [animated, setAnimated] = useState(true);
  const isTransitioning         = useRef(false);

  const offset = -(index * (100 / VISIBLE));

  const next = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(true);
    setIndex(i => i + 1);
  };

  const prev = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    if (index === 0) {
      const realMax = arrivals.length;
      setAnimated(false);
      setIndex(realMax);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true);
        setIndex(realMax - 1);
        isTransitioning.current = false;
      }));
      return;
    }
    setAnimated(true);
    setIndex(i => i - 1);
  };

  const onTransitionEnd = () => {
    isTransitioning.current = false;
    if (index >= arrivals.length) {
      setAnimated(false);
      setIndex(0);
    }
  };

  return (
    <section className="new-arrivals" id="new-in">

      {}
      <div className="na-header">
        <div className="na-title-wrap">
          <p className="na-eyebrow">Just Dropped</p>
          <h2 className="na-headline">New Arrivals</h2>
        </div>
        <Link to="/products" className="na-view-all">View All →</Link>
      </div>

      {}
      <div className="na-carousel-wrapper">
        <button className="na-btn" onClick={prev} aria-label="Previous">&#8249;</button>

        <div className="na-track">
          <div
            className="na-inner"
            style={{
              transform: `translateX(${offset}%)`,
              transition: animated ? 'transform 0.4s ease' : 'none',
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {looped.map((item, i) => (
              <Link
                to="/products"
                key={`${item.id}-${i}`}
                className="na-card"
              >
                {}
                <div className="na-card-img-wrap">
                  <img src={item.img} alt={item.name} className="na-card-img" />
                  <span className="na-badge">{item.badge}</span>
                </div>

                {}
                <div className="na-card-info">
                  <div className="na-card-meta">
                    <span className="na-card-name">{item.name}</span>
                    <span className="na-card-color">{item.color}</span>
                  </div>
                  <span className="na-card-price">${item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button className="na-btn" onClick={next} aria-label="Next">&#8250;</button>
      </div>

    </section>
  );
};

export default NewArrivals;