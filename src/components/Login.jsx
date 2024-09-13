import React from 'react'

const handleClick = () => {
    const clientId = "Your client Id";
    const redirectUrl = "http://localhost:5173/";// your redirect URL
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
        " "
    )}&response_type=token&show_dialog=true`;
}

const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen bg-green-600 gap-20'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                alt="spotify"
                className='h-[20vh]' />
            <button onClick={handleClick} className='py-5 px-5 rounded-full bg-black text-green-400 border-none text-2xl cursor-pointer'>
                Connect Spotify
            </button>
        </div>
    )
}

export default Login