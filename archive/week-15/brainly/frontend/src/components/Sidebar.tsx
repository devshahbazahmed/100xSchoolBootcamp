import Logo from '../icons/Logo';
import TwitterIcon from '../icons/TwitterIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
	return (
		<div className="h-screen border-r-2 pl-6 bg-white w-76 fixed left-0 top-0 border-slate-200 ">
			<div className="flex text-2xl pt-6 items-center text-purple-600 font-bold hover:cursor-pointer">
				<div className="pr-4">
					<Logo />
				</div>
				Brainly
			</div>
			<div className="pt-8 pl-4">
				<SidebarItem
					text="Twitter"
					icon={<TwitterIcon />}
				/>
				<SidebarItem
					text="Youtube"
					icon={<YoutubeIcon />}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
