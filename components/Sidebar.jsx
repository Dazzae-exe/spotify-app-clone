import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);

  console.log(playlists);

  console.log(`This p tag was clicked, ${playlistId}`);

  return (
    <div className="text-gray-500 border-gray-900 p-5 text-sm overflow-y-scroll h-screen scrollbar-hide lg:text-xs sm:max-w-[12rem] lg:max-w-[15rem] md:inline-flex hidden">
      <div className="space-y-2">
        <button className="space-x-2 hover:text-green-400 flex items-center">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="space-x-2 hover:text-green-400 flex items-center">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="space-x-2 hover:text-green-400 flex items-center">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="space-x-2 hover:text-green-400 flex items-center">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="space-x-2 hover:text-green-400 flex items-center">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="space-x-2 hover:text-green-400 flex items-center">
          <RssIcon className="w-5 h-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists... */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="hover:text-white cursor-pointer"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
