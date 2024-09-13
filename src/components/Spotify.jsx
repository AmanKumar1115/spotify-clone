import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/constant';
const Spotify = () => {
    const [{ token }, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
    }
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data } = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                const userInfo = {
                    userId: data.id,
                    userUrl: data.external_urls.spotify,
                    name: data.display_name,
                    imageUrl: data.images[0]?.url || '',
                };
                dispatch({ type: reducerCases.SET_USER, userInfo });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (token) {
            getUserInfo();
        }
    }, [token, dispatch]);


    return (
        <div className="max-w-screen max-h-screen overflow-hidden grid grid-rows-[85vh_15vh]">
            <div className="spotify__body grid grid-cols-[15vw_85vw] h-full w-full bg-gradient-to-b from-transparent to-black bg-[#205764]">
                <Sidebar />
                <div className="body h-full w-full overflow-auto" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBackground={navBackground} />
                    <div className="Body_contents">
                        <Body headerBackground={headerBackground} />
                    </div>
                </div>
            </div>
            <div className="spotify_footer">
                <Footer />
            </div>
        </div>
    )
}

export default Spotify;
