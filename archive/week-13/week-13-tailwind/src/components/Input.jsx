import PropTypes from "prop-types";

function Input({ type, placeholder, onChange }) {
    return (
        <div>
            <input type={type} placeholder={placeholder} className={`px-20 py-4 bg-sky-800 rounded-xl border-sky-900 mt-[-50px] focus:border-none`} onChange={onChange} />
        </div>
    );
}

export default Input;

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};