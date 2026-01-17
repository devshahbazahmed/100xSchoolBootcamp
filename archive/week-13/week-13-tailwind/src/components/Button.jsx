import PropTypes from "prop-types";

function Button({ children, disabled, onClick }) {
	return (
		<div onClick={onClick} className={`px-32 py-4 text-white ${disabled ? "bg-slate-500" : "bg-cyan-600"} rounded-xl mt-[-40px] ${disabled ? "" : "hover:bg-slate-800"} hover:cursor-pointer`}>
			{children}
		</div>
	);
}

export default Button;

Button.propTypes = {
	children: PropTypes.object,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};