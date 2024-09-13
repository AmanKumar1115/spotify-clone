import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";
import SeekToPosition from "./SeekToPosition";

export default function Footer() {
    return (
        <div className="h-full w-full bg-gray-900 border-t border-gray-800 grid grid-cols-1fr-2fr-1fr items-center justify-center p-4">
            <CurrentTrack />
            <div className="flex flex-col">
                <SeekToPosition />
                <PlayerControls />
            </div>

            <Volume />
        </div>
    );
}
