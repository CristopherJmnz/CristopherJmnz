const Logo = '/img/JmnzLogoNoBackgroundSquare.webp';
import './Hero.css';
export const Hero = () => {
  return (
    <section className="banner">
      <img src={Logo} height="250" width="250" className="banner-logo" alt="CristopherJmnz logo" />
      <h1 className="banner-title">Cristopher Jiménez</h1>
      <h2 className="banner-subtitle">Ingeniero de software</h2>
    </section>
  );
};
export default Hero;
