import { PropTypes } from "prop-types";
import React from "react";

const Card = ({ children }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            margin: '10px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.Object,
};

const ItemList = ({ items }) => {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
};

ItemList.propTypes = {
    items: PropTypes.Array
};

function Card1() {
    throw new Error("Error in rendering");
    return (
        <div style={{ backgroundColor: "red", borderRadius: 20, padding: 10, margin: 10 }}>Hello</div>
    );
}

function Card2() {
    return (
        <div style={{ backgroundColor: "red", borderRadius: 20, padding: 10, margin: 10 }}>Hi there</div>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ backgroundColor: "red", borderRadius: 20, padding: 10, margin: 10 }}>Something went wrong</div>;
        }

        return this.props.children;
    }
}

const App = () => {
    const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ];
    return (
        <>
            <div>
                <Card>
                    <h2>Card Title</h2>
                    <p>This is some content inside the card.</p>
                </Card>
                <Card>
                    <h2>Another Card</h2>
                    <p>This card has different content!</p>
                </Card>
            </div>
            <ItemList items={items} />
            <ErrorBoundary>
                <Card1 />
            </ErrorBoundary>
            <Card2 />
        </>
    );
};

export default App;
