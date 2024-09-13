import React from "react";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from '../utils/constant';

export default function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };

    const changeTrack = async (type) => {
        const validTypes = ['next', 'previous'];
        if (!validTypes.includes(type)) {
            console.error("Invalid type provided. Use 'next' or 'previous'.");
            return;
        }

        try {
            await axios.post(
                `https://api.spotify.com/v1/me/player/${type}`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            if (response.data && response.data.item) {
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
        } catch (error) {
            console.error("Error changing track:", error);
        }
    };


    return (
        <div className="flex items-center justify-center gap-8 pt-2">
            <div className="text-gray-400 transition duration-200 ease-in-out hover:text-white">
                <BsShuffle />
            </div>
            <div className="text-gray-400 text-2xl transition duration-200 ease-in-out hover:text-white">
                <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
            </div>
            <div className="text-2xl text-white">
                {playerState ? (
                    <BsFillPauseCircleFill onClick={changeState} />
                ) : (
                    <BsFillPlayCircleFill onClick={changeState} />
                )}
            </div>
            <div className="text-gray-400 text-2xl transition duration-200 ease-in-out hover:text-white">
                <CgPlayTrackNext onClick={() => changeTrack("next")} />
            </div>
            <div className="text-gray-400 transition duration-200 ease-in-out hover:text-white">
                <FiRepeat />
            </div>
        </div>
    );
}

