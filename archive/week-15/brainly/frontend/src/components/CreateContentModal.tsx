import { useRef, useState } from 'react';
import CrossIcon from '../icons/CrossIcon';
import Button from './Button';
import Input from './Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';

enum ContentType {
	Youtube = 'youtube',
	Twitter = 'twitter',
}

// controlled component
const CreateContentModal = ({ open, onClose }) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);
	const [type, setType] = useState(ContentType.Youtube);

	async function addContent() {
		const title = titleRef.current?.value;
		const link = linkRef.current?.value;

		await axios.post(
			`${BACKEND_URL}/api/v1/content`,
			{
				title,
				link,
				type,
			},
			{
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			},
		);

		onClose();
	}
	return (
		<div>
			{open && (
				<div>
					<div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
					<div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
						<div className="flex flex-col justify-center">
							<span className="bg-white opacity-100 p-4 rounded-md">
								<div className="flex justify-end">
									<div onClick={onClose}>
										<CrossIcon />
									</div>
								</div>
								<div className="flex flex-col gap-5 mt-3">
									<Input
										type="text"
										className=""
										placeholder="Enter Title"
										reference={titleRef}
									/>
									<Input
										type="text"
										className=""
										placeholder="Enter Link"
										reference={linkRef}
									/>
								</div>
								<div className="mt-3">
									<h1>Type</h1>
									<div className="flex justify-center items-center gap-3">
										<Button
											text="Youtube"
											variant={
												type === ContentType.Youtube ? 'secondary' : 'primary'
											}
											onClick={() => {
												setType(ContentType.Youtube);
											}}></Button>
										<Button
											text="Twitter"
											variant={
												type === ContentType.Twitter ? 'secondary' : 'primary'
											}
											onClick={() => {
												setType(ContentType.Twitter);
											}}></Button>
									</div>
								</div>
								<div className="flex justify-center my-3">
									<Button
										text="Submit"
										variant="secondary"
										onClick={addContent}></Button>
								</div>
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateContentModal;
