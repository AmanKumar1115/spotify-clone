import axios from "axios";
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from '../utils/constant';

export default function Body({ headerBackground }) {
    const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();

    useEffect(() => {
        const getInitialPlaylist = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                const selectedPlaylist = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description.startsWith("<a")
                        ? ""
                        : response.data.description,
                    image: response.data.images?.[0]?.url || '',
                    tracks: response.data.tracks.items.map(({ track }) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map((artist) => artist.name),
                        image: track.album.images?.[2]?.url || '',
                        duration: track.duration_ms,
                        album: track.album.name,
                        context_uri: track.album.uri,
                        track_number: track.track_number,
                    })),
                };

                dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            } catch (error) {
                console.error('Error fetching playlist data:', error);
            }
        };

        if (token && selectedPlaylistId) {
            getInitialPlaylist();
        }
    }, [token, dispatch, selectedPlaylistId]);

    const playTrack = async (id, name, artists, image, context_uri, track_number) => {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                context_uri,
                offset: {
                    position: track_number - 1,
                },
                position_ms: 0,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (response.status === 204) {
            const currentPlaying = {
                id, name,
                artists,
                image,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        } else {
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        }
    };

    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    return (
        <div className={`p-4 ${headerBackground ? "bg-black bg-opacity-90" : ""}`}>
            {selectedPlaylist && (
                <>
                    <div className="flex items-center gap-8 mb-8">
                        <div className="w-60 h-60 shadow-lg">
                            <img src={selectedPlaylist.image} alt="selected playlist" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-white space-y-4">
                            <span className="text-sm">PLAYLIST</span>
                            <h1 className="text-6xl">{selectedPlaylist.name}</h1>
                            <p className="text-gray-400">{selectedPlaylist.description}</p>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-[0.3fr_3fr_2fr_0.1fr] text-gray-400 py-4 px-6 sticky top-0 bg-black bg-opacity-75">
                            <div>#</div>
                            <div>TITLE</div>
                            <div>ALBUM</div>
                            <div>
                                <AiFillClockCircle />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mb-20">
                            {
                                selectedPlaylist.tracks.map(({ id, name, artists, image, duration, album, context_uri, track_number, }, index) => (
                                    <div
                                        className="grid grid-cols-[0.3fr_3.1fr_2fr_0.1fr] p-2 hover:bg-black hover:bg-opacity-50 cursor-pointer"
                                        key={id}
                                        onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}
                                    >
                                        <div className="flex items-center">{index + 1}</div>
                                        <div className="flex items-center space-x-4">
                                            <img src={image} alt="track" className="w-10 h-10 object-cover" />
                                            <div className="flex flex-col">
                                                <span className="text-white">{name}</span>
                                                <span className="text-gray-400">{artists.join(", ")}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">{album}</div>
                                        <div className="flex items-center">{msToMinutesAndSeconds(duration)}</div>
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
