import { Shield, Sun, Feather, Gem } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: Shield,
    title: 'UV400 Protection',
    sub: 'Blocks 100% of harmful UVA & UVB rays your eyes stay safe all day.',
  },
  {
    icon: Sun,
    title: 'Polarized Lenses',
    sub: 'Reduces glare for crystal-clear vision whether you\'re driving or outdoors.',
  },
  {
    icon: Feather,
    title: 'Lightweight Fit',
    sub: 'Engineered for all-day comfort you\'ll forget you\'re even wearing them.',
  },
  {
    icon: Gem,
    title: 'Premium Build',
    sub: 'Handcrafted with materials built to last a lifetime, not just a season.',
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="features-grid">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="feature-item">
              <div className="feature-icon">
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-sub">{item.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;