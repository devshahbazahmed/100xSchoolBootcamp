import Card from "../Card/Card";
import "./Products.css";

function Products() {
    return (
        <div className="products-section">
            <h2 className="products-title">Cancerous Products</h2>
            <p className="products-subtitle">
                Discover an extensive selection of highly cancerous products
                designed specifically for you!
            </p>
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    );
}

export default Products;
