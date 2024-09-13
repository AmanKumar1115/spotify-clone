import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";

export default function SeekToPosition() {
    const [{ token }] = useStateProvider();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchCurrentlyPlaying = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            if (data) {
                setCurrentTrack(data.item);
                setProgress(data.progress_ms);
            }
        };

        fetchCurrentlyPlaying();

        // Polling every 5 seconds to get live updates
        const interval = setInterval(fetchCurrentlyPlaying, 1000);
        return () => clearInterval(interval);
    }, [token]);

    const seekToPosition = async (e) => {
        const position_ms = parseInt(e.target.value);
        await axios.put(
            "https://api.spotify.com/v1/me/player/seek",
            {},
            {
                params: {
                    position_ms: position_ms,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        setProgress(position_ms);
    };

    return (
        <div className="flex flex-col items-center pt-[-9]">
            {currentTrack ? (
                <>
                    <div className="text-sm text-white">
                        {Math.floor(progress / 60000)}:{Math.floor((progress % 60000) / 1000).toString().padStart(2, '0')} /
                        {Math.floor(currentTrack.duration_ms / 60000)}:{Math.floor((currentTrack.duration_ms % 60000) / 1000).toString().padStart(2, '0')}
                    </div>
                    <input
                        type="range"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        onMouseUp={(e) => seekToPosition(e)}
                        min={0}
                        max={currentTrack.duration_ms}
                        className="w-60 rounded-2xl h-2 mt-2"
                    />
                </>
            ) : (
                <div>No track currently playing</div>
            )}
        </div>
    );
}
