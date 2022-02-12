import { useRecoilValue } from "recoil";
import { playlistsState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistsState);
  return (
    <div className="p-8 flex-col space-y-1 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <>
          <Song key={track.track.id} order={i}
          track={track}  
          />
        </>
      ))}
    </div>
  );
}

export default Songs;
