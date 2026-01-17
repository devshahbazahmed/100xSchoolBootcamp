import PCIcon from "./assets/pc-icon.png";
import Button from "./components/Button.jsx";
import Input from "./components/Input.jsx";
import { Otp } from "./components/Otp.jsx";

const Screen1 = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-sky-950 min-h-screen gap-20 ">
            <div className="flex gap-5 mt-32">
                <img src={PCIcon} alt="pc-icon" width={50} height={20} />
                <h1 className="font-bold text-4xl"><span className="text-teal-500">Webinar</span>.gg</h1>
            </div>

            <h3 className="text-white font-bold text-2xl">Verify Your Age</h3>
            <p className="text-gray-400 font-semibold ">Please confirm your birth year. This data will not be stored.</p>
            <Input type="date" placeholder="Your Birth Year" />
            <Button disabled={false}>Continue</Button>
            <Input type="email" placeholder="Your Email" />
            <Button disabled={false}>Continue</Button>
            <Otp number={6} />
        </div>
    );
};

export default Screen1;