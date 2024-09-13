import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from '../utils/constant';
import { useStateProvider } from "../utils/StateProvider";

export default function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();

    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { items } = response.data;
            const playlists = items.map(({ name, id }) => {
                return { name, id };
            });
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        };
        getPlaylistData();
    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
    };

    return (
        <div className="text-gray-500 h-full overflow-hidden">
            <ul className="list-none flex flex-col gap-4 p-4 h-[55vh] max-h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400">
                {playlists.map(({ name, id }) => (
                    <li
                        key={id}
                        onClick={() => changeCurrentPlaylist(id)}
                        className="transition ease-in-out duration-300 cursor-pointer hover:text-white"
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
