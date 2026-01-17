import { useRef } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Logo from '../icons/Logo';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	async function signin() {
		const username = usernameRef.current?.value;
		const password = passwordRef.current?.value;

		const response = await axios.post(`${BACKEND_URL}`, {
			username,
			password,
		});

		const jwt = response.data.token;
		localStorage.setItem('token', jwt);
		// redirect the user to the dashboard
		navigate('/dashboard');
	}
	return (
		<div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
			<div className="bg-white rounded-lg border border-gray-300 shadow-md min-w-48 p-10">
				<div className="flex text-2xl pt-3 items-center text-purple-600 font-bold hover:cursor-pointer">
					<div className="pr-4">
						<Logo />
					</div>
					Brainly
				</div>
				<div className="mt-5">
					<Input
						type="text"
						placeholder="Enter Username"
						className="w-full"
						reference={usernameRef}
					/>
					<Input
						type="text"
						placeholder="Enter Password"
						className="w-full mt-5"
						reference={passwordRef}
					/>
				</div>

				<div className="flex justify-center pt-5">
					<Button
						variant="secondary"
						text="Signin"
						fullWidth={true}
						loading={false}
						onClick={signin}
					/>
				</div>
			</div>
		</div>
	);
};

export default Signin;
