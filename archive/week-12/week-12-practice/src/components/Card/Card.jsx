import "./Card.css";
import CardImage from "../../assets/card-image.png";

function Card() {
    return (
        <div className="card-container">
            <div className="card-image-container">
                <img src={CardImage} alt="card-image" className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">
                    <span>bimal</span> Elaichi
                </h3>
                <p className="card-subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    imperdiet enim nec orci lacinia pellentesque.
                </p>
                <div className="button-container">
                    <button className="button-orange">Die Now</button>
                    <button className="button-white">Die Later</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
