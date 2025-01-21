import { IoMail } from "react-icons/io5";
import { assets } from "../assets/assets.js"

const Footer = () => {
    return (
        <div className="min-h-[280px] w-full bg-[#15171c] text-white">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 py-8 items-center">
                <div className="flex flex-col items-center gap-y-3 px-3 text-center xl:mt-16 lg:mt-16">
                    <img className="ml-5 font-bold cursor-pointer xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-4xl" src={assets.logo} alt="Logo"></img>
                    <p className="text-sm max-w-[400px] font-normal sm:text-xl">The Ultimate Guide To Ace Successful</p>
                </div>

                <div className="flex flex-col gap-y-3 text-center lg:text-base xl:mt-16 lg:mt-16 sm:text-xl">
                    <h1 className="font-medium text-center cursor-pointer">Quick Links</h1>
                    <div className="text-[#ABAFB8] flex flex-col cursor-pointer">
                        <a href="/#Navbar">Home</a>
                        <a href="/#Navbar">Contact</a>
                    </div>
                </div>

                <div className="flex flex-col gap-y-3 text-center lg:text-base xl:mt-16 lg:mt-16 sm:text-xl">
                    <h1 className="font-medium text-center">GET IN TOUCH</h1>
                    <div className="flex items-center gap-x-3 justify-center text-[#ABAFB8] cursor-pointer">
                        <IoMail className="w-5 h-5 cursor-pointer" />
                        <span>algomaster@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
