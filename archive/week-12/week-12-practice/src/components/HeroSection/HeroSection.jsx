import "./HeroSection.css";
import HeroImage from "../../assets/hero-image.png";

function HeroSection() {
    return (
        <div className="hero-section">
            <h1 className="hero-title">
                Bolo Zubaan <span className="title-span">Canceri</span>
            </h1>
            <p className="hero-subtitle">More you eat, sooner you die</p>
            <img src={HeroImage} alt="hero-image" className="hero-image" />
        </div>
    );
}

export default HeroSection;
