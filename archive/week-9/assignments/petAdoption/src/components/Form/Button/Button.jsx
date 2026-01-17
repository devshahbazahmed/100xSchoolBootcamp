import PropTypes from "prop-types";

function Button({ children, onClick, className }) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}

export default Button;

Button.propTypes = {
    children: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};