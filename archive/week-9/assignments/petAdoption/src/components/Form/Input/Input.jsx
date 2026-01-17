import PropTypes from "prop-types";
import "./Input.css";

function Input({ label, type, placeholder, className, onChange }) {
    return (
        <div className="input-container">
            <label className="label">{label}</label>
            <input type={type} onChange={onChange} className={`${className} input`} placeholder={placeholder} />
        </div>
    );
}

export default Input;

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};