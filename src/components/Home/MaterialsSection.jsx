import { useEffect, useRef, useState } from 'react';
import specs     from '../../assets/specs.png';
import titanium  from '../../assets/titanium.png';
import acetate   from '../../assets/acetate.png';
import hinge     from '../../assets/hinge.png';
import './MaterialsSection.css';

const hotspots = [
  {
    id: 1,
    top: 18, left: 43,
    label: 'Titanium Alloy Frame',
    sub: 'Lightweight yet unbreakable',
    dir: 'left',
    img: titanium,
  },
  {
    id: 2,
    top: 72, left: 40,
    label: 'Handcrafted Acetate',
    sub: 'Rich texture, zero compromise',
    dir: 'left',
    img: acetate,
  },
  {
    id: 3,
    top: 66, left: 59,
    label: 'Spring Hinge',
    sub: 'Precision-engineered durability',
    dir: 'right',
    img: hinge,
  },
];

const MaterialsSection = () => {
  const sectionRef  = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="materials-section">
      <div className="materials-header">
        <p className="materials-eyebrow">Built to Last</p>
        <h2 className="materials-headline">
          Precision Meets<br />Premium Materials.
        </h2>
        <p className="materials-sub">
          Every frame engineered with aircraft-grade titanium, hand-polished
          acetate, and impact-resistant lenses — built for those who refuse
          to compromise.
        </p>
      </div>

      <div
        className={`materials-img-wrap ${triggered ? 'triggered' : ''}`}
        ref={sectionRef}
      >
        <img src={specs} alt="Sunglasses materials" className="materials-img" />

        {hotspots.map((spot, i) => (
          <div
            key={spot.id}
            className="hotspot-anchor"
            style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
          >
            {}
            <div
              className={`hotspot-dot ${hoveredId === spot.id ? 'hovered' : ''}`}
              style={{ animationDelay: `${0.3 + i * 0.4}s` }}
            />

            {}
            <div
              className={`hotspot-line hotspot-line--${spot.dir}`}
              style={{ animationDelay: `${0.5 + i * 0.4}s` }}
            />

            {}
            <div
              className={`hotspot-label hotspot-label--${spot.dir} ${hoveredId === spot.id ? 'hovered' : ''}`}
              style={{ animationDelay: `${0.8 + i * 0.4}s` }}
              onMouseEnter={() => setHoveredId(spot.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`hotspot-preview ${hoveredId === spot.id ? 'visible' : ''}`}>
                <img src={spot.img} alt={spot.label} />
              </div>
              <div className="hotspot-text">
                <span className="hotspot-name">{spot.label}</span>
                <span className="hotspot-sub">{spot.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MaterialsSection;