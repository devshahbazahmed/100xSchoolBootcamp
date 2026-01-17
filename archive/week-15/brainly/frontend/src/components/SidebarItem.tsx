import type { ReactElement } from 'react';

const SidebarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
	return (
		<div className="flex hover:cursor-pointer text-gray-700 py-2 hover:bg-gray-200 rounded-md max-w-48 pl-4 transition-all duration-200">
			<div className="pr-2">{icon}</div>
			<div>{text}</div>
		</div>
	);
};

export default SidebarItem;
