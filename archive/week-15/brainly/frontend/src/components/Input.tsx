interface Input {
	type: string;
	placeholder: string;
	className: string;
	reference?: HTMLInputElement;
}

const Input = ({ type, placeholder, className, reference }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={`${className} px-4 py-2 border bg-slate-200 text-black rounded-md m-2`}
			ref={reference}
		/>
	);
};

export default Input;
