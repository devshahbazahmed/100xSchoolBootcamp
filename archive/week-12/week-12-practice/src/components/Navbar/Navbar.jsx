import Logo from "../Logo";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar">
            <Logo />
            <div className="products">
                <a href="#">Products</a>
                <button className="button">Die Now</button>
            </div>
        </div>
    );
}

export default Navbar;
