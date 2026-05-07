import landscape1 from '../../assets/landscape1.png';
import landscape2 from '../../assets/landscape2.png';
import portrait1  from '../../assets/portrait1.png';
import portrait2  from '../../assets/portrait2.png';
import portrait3  from '../../assets/portrait3.png';
import './InstagramGallery.css';

const InstagramGallery = () => {
  return (
    <section className="ig-section" id="lookbook">
      <div className="ig-inner">

        {}
        <div className="ig-left">
          <p className="ig-eyebrow">Follow Us</p>
          <h2 className="ig-headline">@lenslux</h2>
          <p className="ig-sub">
            Style captured in every shot — see how the world looks through LensLux.
            Real people, real moments, real style.
          </p>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="ig-btn"
          >
            Follow on Instagram
          </a>
        </div>

        {}
        <div className="ig-right">

          {}
          <div className="ig-row">
            <div className="ig-item ig-item--wide">
              <img src={landscape2} alt="LensLux" className="ig-img ig-img--top" />
            </div>
            <div className="ig-item ig-item--wide">
              <img src={landscape1} alt="LensLux" className="ig-img ig-img--top" />
            </div>
          </div>

          {}
          <div className="ig-row">
            <div className="ig-item ig-item--square">
              <img src={portrait2} alt="LensLux" className="ig-img ig-img--face" />
            </div>
            <div className="ig-item ig-item--square">
              <img src={portrait1} alt="LensLux" className="ig-img ig-img--face" />
            </div>
            <div className="ig-item ig-item--square">
              <img src={portrait3} alt="LensLux" className="ig-img ig-img--face" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;