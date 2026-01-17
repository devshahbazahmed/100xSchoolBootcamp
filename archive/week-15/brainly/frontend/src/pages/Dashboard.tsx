import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import CreateContentModal from '../components/CreateContentModal';
import Button from '../components/Button';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import Card from '../components/Card';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL, FRONTEND_URL } from '../config';
import axios from 'axios';

function Dashboard() {
	const [modalOpen, setModalOpen] = useState(false);
	const { contents, refresh } = useContent();

	useEffect(() => {
		refresh();
	}, [modalOpen]);
	return (
		<div>
			<Sidebar />
			<div className="p-4 ml-76 min-h-screen bg-gray-100">
				<CreateContentModal
					open={modalOpen}
					onClose={() => {
						setModalOpen(false);
					}}
				/>
				<div className="flex justify-end gap-4">
					<Button
						text="Add Content"
						variant="secondary"
						onClick={() => {
							setModalOpen(true);
						}}
						startIcon={<PlusIcon />}></Button>
					<Button
						text="Share Brain"
						variant="primary"
						startIcon={<ShareIcon />}
						onClick={async () => {
							const response = await axios.post(
								`${BACKEND_URL}/api/v1/brain/share`,
								{
									share: true,
								},
								{
									headers: {
										Authorization: localStorage.getItem('token'),
									},
								},
							);
							const shareUrl = `${FRONTEND_URL}/share/${response.data.hash}`;
							alert(shareUrl);
						}}></Button>
				</div>

				<div className="flex gap-4 flex-wrap">
					{contents.map(({ type, link, title }) => (
						<Card
							type={type}
							title={title}
							link={link}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
