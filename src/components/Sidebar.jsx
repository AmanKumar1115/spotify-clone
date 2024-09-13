import React from 'react'
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from './Playlists';



const Sidebar = () => {
    return (
        <div className="bg-black text-gray-400 flex flex-col h-full w-full">
            <div className="top__links flex flex-col">
                <div className="logo text-center my-4">
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                        alt="spotify"
                        className="max-w-[80%] h-auto mx-auto"
                    />
                </div>
                <ul className="list-none flex flex-col gap-4 p-4">
                    <li className="flex gap-4 cursor-pointer transition ease-in-out duration-300 hover:text-white">
                        <MdHomeFilled className="text-lg mt-1" />
                        <span>Home</span>
                    </li>
                    <li className="flex gap-4 cursor-pointer transition ease-in-out duration-300 hover:text-white">
                        <MdSearch className="text-lg mt-1" />
                        <span>Search</span>
                    </li>
                    <li className="flex gap-4 cursor-pointer transition ease-in-out duration-300 hover:text-white">
                        <IoLibrary className="text-lg mt-1" />
                        <span>Your Library</span>
                    </li>
                </ul>
            </div>
            <Playlists />
        </div>
    )
}

export default Sidebar