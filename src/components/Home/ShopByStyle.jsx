import { Link } from 'react-router-dom';
import classic1 from '../../assets/classic1.png';
import classic2 from '../../assets/classic2.png';
import sports1  from '../../assets/sports1.png';
import sports2  from '../../assets/sports2.png';
import luxury1  from '../../assets/luxury1.png';
import luxury2  from '../../assets/luxury2.png';
import './ShopByStyle.css';

const styles = [
  {
    num: '', label: 'Classic', sub: 'Timeless frames for every face',
    to: '/products?category=Classic',
    img1: classic1, img2: classic2,
  },
  {
    num: '', label: 'Sport', sub: 'Built for performance, worn with pride',
    to: '/products?category=Sport',
    img1: sports1, img2: sports2,
  },
  {
    num: '', label: 'Luxury', sub: 'Premium craftsmanship, redefined',
    to: '/products?category=Luxury',
    img1: luxury1, img2: luxury2,
  },
];

const ShopByStyle = () => {
  return (
    <section className="shop-by-style" id="collection">
      <div className="style-grid">
        {styles.map(s => (
          <Link to={s.to} key={s.label} className="style-card">
            <div className="style-img-wrap">
              <img src={s.img1} alt={s.label}             className="style-img-default" />
              <img src={s.img2} alt={`${s.label} hover`}  className="style-img-hover" />
            </div>
            <div className="style-card-label">
              <span className="style-tag">{s.num}</span>
              <div>
                <h3>{s.label}</h3>
                <p>{s.sub}</p>
              </div>
              <span className="style-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByStyle;