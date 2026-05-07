import HeroSection    from '../components/home/HeroSection';
import BrandStatement from '../components/Home/BrandStatement';
import ShopByStyle from '../components/Home/ShopByStyle';
import MaterialsSection  from '../components/home/MaterialsSection';
import NewArrivals from '../components/Home/NewArrivals';
import Features from '../components/Home/Features';
import Trending from '../components/Home/Trending';
import PromoBanner from '../components/Home/PromoBanner';
import InstagramGallery from '../components/Home/InstagramGallery';
import Testimonials from '../components/Home/Testimonials';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <BrandStatement />
      <ShopByStyle />
      <MaterialsSection />
      <NewArrivals />
      <Features />
      <Trending />
      <PromoBanner />
      <InstagramGallery />
      <Testimonials />
    </div>

  );
};

export default Home;