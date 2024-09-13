import axios from "axios";
import React from "react";
import { useStateProvider } from "../utils/StateProvider";

export default function Volume() {
    const [{ token }] = useStateProvider();

    const setVolume = async (e) => {
        await axios.put(
            "https://api.spotify.com/v1/me/player/volume",
            {},
            {
                params: {
                    volume_percent: parseInt(e.target.value),
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    };

    return (
        <div className="flex justify-end items-center">
            <input
                type="range"
                onMouseUp={(e) => setVolume(e)}
                min={0}
                max={100}
                className="w-60 rounded-2xl h-2"
            />
        </div>
    );
}
