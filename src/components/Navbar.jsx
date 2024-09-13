import React from "react";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const Navbar = ({ navBackground }) => {
    const [{ userInfo }] = useStateProvider();

    return (
        <div className={`flex justify-between items-center p-8 h-15vh sticky top-0 transition duration-300 ${navBackground ? "bg-black bg-opacity-70" : ""
            }`}>
            <div className="flex items gap-2 bg-white w-[30%] p-2 rounded-full">
                <FaSearch className="text-lg mt-1" />
                <input type="text" name="search" placeholder="Artists, songs, or podcasts" className="border-none h-5 w-full focus:outline-none" />
            </div>
            <div className="flex items-center justify-center bg-black p-1 pr-4 rounded-full" >
                <a
                    href={userInfo?.userUrl}
                    className="flex items-center justify-center gap-2 text-white font-bold no-underline"
                >
                    {userInfo?.imageUrl ? (
                        <img
                            src={userInfo.imageUrl}
                            alt="profile image"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <CgProfile className="text-lg bg-[#282828] p-1 rounded-full text-[#c7c5c5]" />
                    )}

                    <span>{userInfo?.name}</span>
                </a>
            </div>
        </div>
    )
}

export default Navbar