import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from '../utils/constant';

export default function CurrentTrack() {
    const [{ token, currentPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.data !== "") {
                const currentPlaying = {
                    id: response.data.item.id,
                    name: response.data.item.name,
                    artists: response.data.item.artists.map((artist) => artist.name),
                    image: response.data.item.album.images[2].url,
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            } else {
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }
        };
        getCurrentTrack();
    }, [token, dispatch]);

    return (
        <div className="flex items-center gap-4">
            {currentPlaying && (
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src={currentPlaying.image}
                            alt="currentPlaying"
                            className="w-16 h-16"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-white">{currentPlaying.name}</h4>
                        <h6 className="text-gray-400">{currentPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )}
        </div>
    );
}
