import { useState, useEffect } from 'react';
import './Testimonials.css';

const reviews = [
  {
    id: 1,
    name: 'Marcus Rivera',
    initials: 'MR',
    rating: 5,
    date: 'March 12, 2026',
    color: '#667eea',
    review: 'Absolutely love my LensLux shades! The titanium frame is incredibly lightweight and the polarized lenses make such a difference when driving. Best eyewear purchase I have ever made.',
  },
  {
    id: 2,
    name: 'Sofia Reyes',
    initials: 'SR',
    rating: 5,
    date: 'February 28, 2026',
    color: '#f093fb',
    review: 'I bought the Cannes Cat-Eye and I get compliments every single day. The quality is premium and you can really feel the difference compared to cheaper brands. Worth every peso!',
  },
  {
    id: 3,
    name: 'James Lim',
    initials: 'JL',
    rating: 5,
    date: 'February 14, 2026',
    color: '#4facfe',
    review: 'Ordered the sport wraparound for cycling and it has been a game changer. UV400 protection is real my eyes no longer feel strained after long rides. Highly recommended!',
  },
  {
    id: 4,
    name: 'Camille Santos',
    initials: 'CS',
    rating: 5,
    date: 'January 30, 2026',
    color: '#43e97b',
    review: 'The packaging alone already felt luxurious. When I tried the glasses on, I knew immediately this was the real deal. The acetate frame fits perfectly and looks stunning.',
  },
  {
    id: 5,
    name: 'Daniel Cruz',
    initials: 'DC',
    rating: 5,
    date: 'January 15, 2026',
    color: '#fa709a',
    review: 'LensLux exceeded my expectations. I was skeptical at first but after wearing them for a month, the hinge is still perfect, no scratches on the lens, and still looks brand new.',
  },
];

const Testimonials = () => {
  const [activeId, setActiveId]   = useState(1);
  const [animKey, setAnimKey]     = useState(0);

  const active = reviews.find(r => r.id === activeId);

  const handleSelect = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveId(prev => {
        const next = prev === reviews.length ? 1 : prev + 1;
        setAnimKey(k => k + 1);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials" id="reviews">
      <div className="testi-inner">

        {}
        <div className="testi-left">
          <div className="testi-header">
            <span className="testi-accent" />
            <h2 className="testi-headline">Customer Reviews</h2>
          </div>

          <div className="testi-list">
            {reviews.map(r => (
              <div
                key={r.id}
                className={`testi-item ${r.id === activeId ? 'active' : ''}`}
                onClick={() => handleSelect(r.id)}
              >
                {}
                <div
                  className="testi-avatar"
                  style={{ background: r.color }}
                >
                  {r.initials}
                </div>

                {}
                <div className="testi-info">
                  <span className="testi-name">{r.name}</span>
                  <div className="testi-meta">
                    <span className="testi-stars">
                      {'★'.repeat(r.rating)}
                    </span>
                    <span className="testi-date">{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="testi-right">
          <div className="testi-quote-wrap" key={animKey}>
            <span className="testi-big-quote">"</span>
            <p className="testi-quote">{active.review}</p>
            <div className="testi-author">
              <div
                className="testi-author-avatar"
                style={{ background: active.color }}
              >
                {active.initials}
              </div>
              <div>
                <span className="testi-author-name">{active.name}</span>
                <span className="testi-author-date">{active.date}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;