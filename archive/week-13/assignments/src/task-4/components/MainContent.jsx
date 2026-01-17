import PropTypes from "prop-types";
import ProfileImage from "../../assets/profile-pic.jpg";
import { GrSchedulePlay } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { Calendar } from "./icons/Calendar";
import { ChevronDown } from "./icons/ChevronDown";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";

function MainContent() {
    return (
        <div className="w-full">
            <div className="bg-black h-36 hidden md:block"></div>
            <div className="grid grid-cols-11 gap-8 p-8 bg-slate-100 h-screen">
                <div className="bg-white col-span-2 shadow-lg h-72 -translate-y-20 rounded-xl hidden md:block">
                    <div className="text-center p-3">
                        <img src={ProfileImage} alt="profile-pic" width={80} height={80} className="object-contain rounded-xl mx-8 my-5" />
                        <h2 className="font-bold text-gray-700 text-lg">Naruto Uzumaki</h2>
                        <p className="text-gray-500 text-xs my-3">narutouzumaki@gmail.com</p>
                        <p className="text-gray-500 text-xs my-3">9999988888</p>
                        <p className="text-gray-500 text-xs">Tokyo, Japan</p>
                    </div>
                </div>
                <div className="col-span-11 md:col-span-6">
                    <p className="text-slate-600">Monday, 14 October</p>
                    <h1 className="text-2xl text-blue-950 font-bold mt-2">Good Morning, Naruto!👋</h1>
                    <div className="bg-white shadow-lg md:h-96 h-72 rounded-xl mt-6 p-4">
                        <div className="flex justify-between bg-slate-200 p-4 rounded-xl">
                            <Calendar />
                            <div className="flex hover:cursor-pointer">
                                <p>Monday, 14 October 2024</p>
                                <ChevronDown />
                            </div>
                            <div className="flex gap-5">
                                <ArrowLeft />
                                <ArrowRight />
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-10 my-5">
                                <div>
                                    <p className="text-xl text-black">11:30 AM</p>
                                    <p className="text-sm text-gray-600">11:30 AM</p>
                                </div>
                                <div className="bg-cyan-500 w-0.5 h-12"></div>
                                <div>
                                    <p className="text-sm text-gray-600">Live</p>
                                    <p className="text-xl text-black">UX Webinar</p>
                                </div>
                            </div>
                            <div className="flex gap-10 my-5">
                                <div>
                                    <p className="text-xl text-black">11:30 AM</p>
                                    <p className="text-sm text-gray-600">11:30 AM</p>
                                </div>
                                <div className="bg-cyan-500 w-0.5 h-12"></div>
                                <div>
                                    <p className="text-sm text-gray-600">Live</p>
                                    <p className="text-xl text-black">UX Webinar</p>
                                </div>
                            </div>
                            <div className="flex gap-10 my-5">
                                <div>
                                    <p className="text-xl text-black">11:30 AM</p>
                                    <p className="text-sm text-gray-600">11:30 AM</p>
                                </div>
                                <div className="bg-cyan-500 w-0.5 h-12"></div>
                                <div>
                                    <p className="text-sm text-gray-600">Live</p>
                                    <p className="text-xl text-black">UX Webinar</p>
                                </div>
                            </div>
                            <div className="flex gap-10 my-5">
                                <div>
                                    <p className="text-xl text-black">11:30 AM</p>
                                    <p className="text-sm text-gray-600">11:30 AM</p>
                                </div>
                                <div className="bg-cyan-500 w-0.5 h-12"></div>
                                <div>
                                    <p className="text-sm text-gray-600">Live</p>
                                    <p className="text-xl text-black">UX Webinar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white md:col-span-3 shadow-lg md:h-72 h-60 rounded-xl col-span-11 mt-18">
                    <div>
                        <div className="p-8">
                            <div className="flex mb-5">
                                <div className="flex flex-col justify-center items-center w-[50%]">
                                    <div className="bg-cyan-500 w-5 h-5 flex justify-center items-center rounded-lg p-5 mb-3 mt-5">
                                        <GrSchedulePlay width={10} height={10} />
                                    </div>
                                    <p className="font-bold text-sm text-center text-slate-900">Schedule a Webinar</p>
                                </div>
                                <div className="flex flex-col justify-center items-center w-[50%]">
                                    <div className="bg-cyan-500 w-5 h-5 flex justify-center items-center rounded-lg p-5 mb-3">
                                        <FaPlus />
                                    </div>
                                    <p className="font-bold text-sm text-slate-900">Join a Webinar</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center -ml-26">
                                <div className="bg-cyan-500 w-5 h-5 flex justify-center items-center rounded-lg p-5 mb-3">
                                    <IoVideocamOutline />
                                </div>
                                <p className="font-bold text-sm text-slate-900">Open Recordings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;

MainContent.propTypes = {
    sidebarOpen: PropTypes.bool,
};